import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import store from '../store/store';
import {
  testPassed,
  testFailed,
  testNewGame,
  testNextLevel,
  testNextStage,
} from '../ducks/progress';
import {
  gameOver,
  gameStart,
  gamePlay,
  nextLevel,
  nextStage,
} from '../ducks/gamestatus';

import ProgressLine from './progress-line';
import beepSound from '../audio/Button-click-sound.mp3';
import correctAnswerSound from '../audio/Correct-answer-sound.mp3';
import wrongAnswerSound from '../audio/Wrong-answer-sound.mp3';

import {generateQuestionsList} from '../api/questions';
import {convertSecondsToTime} from '../api/convertSecondsToTime';
import {logInUser} from '../ducks/users';

import '../style/app.css';

const mapStateToProps = state => {
  return {
    progress: state.progress,
    gameStatus: state.gameStatus,
    currentUser: state.currentUser,
  };
};

let figures = ['star', 'circle', 'flower'];

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: store.getState().currentUser.user.name,
      value: '',
      submitted: false,
      remainingTime: 0,
      colors: [],
      figure: figures[Math.floor(Math.random() * figures.length)],
      percent: '0%',
      muted: false,
      stageCompleted: false,
      levelCompleted: false,
    };
  }

  nextQuestion = () => {
    this.setState(
      {
        question: this.questionsList[store.getState().progress.total].question,
        questionType: this.questionsList[store.getState().progress.total]
          .questionType,
        explanation: this.questionsList[store.getState().progress.total]
          .explanation,
        questionTitle: this.questionsList[store.getState().progress.total]
          .questionTitle,
        correctAnswer: this.questionsList[store.getState().progress.total]
          .correctAnswer,
        responseTime: this.questionsList[store.getState().progress.total]
          .responseTime,
        remainingTime:
          this.questionsList[store.getState().progress.total].responseTime /
          1000,
      },
      () => {
        this.timeout = setTimeout(
          this.handleInputChange,
          this.state.responseTime,
        );
        this.countdown = setInterval(this.countRemainingTime, 1000);
      },
    );
  };

  clearInputField = () => {
    this.setState({
      value: '',
      submitted: false,
    });
  };

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());

    this.setState({
      numberOfLevels: store.getState().levels.config.length,
      numberOfStages: store.getState().levels.config[
        store.getState().currentUser.user.currentSession.level - 1
      ].stages.length,
      numberOfQuestions: store.getState().levels.config[
        store.getState().currentUser.user.currentSession.level - 1
      ].stages[store.getState().currentUser.user.currentSession.stage - 1]
        .questions.length,
    });

    fetch(
      'https://raw.githubusercontent.com/rss-com-lab/learnJs-game-data/master/questions-all.json',
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          // maxNumber: data.complexity[store.getState().complexity].maxNumber,
          config: data,
        });
        this.setQuestionsNextLevel();
        store.dispatch(gamePlay());
      });
  };

  passed = () => {
    this.correctAnswerSound.play();
    store.dispatch(testPassed());
    store.dispatch(gamePlay());
    this.setState({
      colors: [...this.state.colors, store.getState().progress.color],
      percent:
        Math.round(
          (store.getState().progress.passed / this.state.numberOfQuestions) *
            100,
        ) + '%',
    });
  };

  failed = () => {
    this.wrongAnswerSound.play();
    store.dispatch(testFailed());
    store.dispatch(gamePlay());
    this.setState({
      colors: [...this.state.colors, store.getState().progress.color],
      percent:
        Math.round(
          (store.getState().progress.passed / this.state.numberOfQuestions) *
            100,
        ) + '%',
    });
  };

  recordScoresHistory = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let percent =
      Math.round(
        (store.getState().progress.passed / this.state.numberOfQuestions) * 100,
      ) + '%' || '0%';

    let record = [this.state.figure, percent];

    users = users.map(elem => {
      if (elem.name === this.state.user) {
        elem.score.push(record);
      }
      return elem;
    });
    localStorage.setItem('users', JSON.stringify(users));
  };

  componentWillUnmount = () => {
    this.unsubscribe();
    clearTimeout(this.timeout);
    clearTimeout(this.countdown);
  };

  handleClick = e => {
    if (
      this.node.contains(e.target) &&
      e.target.id !== 'clear' &&
      e.target.id !== 'ok'
    ) {
      this.setState({
        value: this.state.value + e.target.innerHTML,
      });
    }
    this.beepSound.play();
  };

  handleBackspace = () => {
    this.setState({
      value: this.state.value.slice(0, -1),
    });
  };

  onSubmit = () => {
    if (store.getState().progress.total < this.state.numberOfQuestions) {
      this.setState(
        {
          submitted: true,
        },
        function() {
          this.handleInputChange();
        },
      );
    }
  };

  setQuestionsNextLevel = () => {
    this.clearInputField();
    store.dispatch(testNextLevel());
    this.questionsList = generateQuestionsList(
      store.getState().complexity,
      store.getState().theme,
      this.state.config,
      this.state.numberOfQuestions,
    );
    this.nextQuestion();
  };

  updateCurrentSession = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users = users.map(elem => {
      if (elem.name === this.state.user) {
        elem.currentSession.stage = store.getState().gameStatus.stageCount;
        elem.currentSession.level = store.getState().gameStatus.levelCount;
        if (store.getState().gameStatus.currentStatus === 'next_level') {
          elem.currentSession.awards++;
        }
        if (store.getState().gameStatus.currentStatus === 'end') {
          elem.currentSession.awards++;
          elem.currentSession.gamePassed = true;
        }
        this.setState({user: elem});
        store.dispatch(logInUser(this.state.user));
      }
      return elem;
    });
    localStorage.setItem('users', JSON.stringify(users));
  };

  handleInputChange = () => {
    const ANIMATION_CACTUS_TIME = 500;
    clearTimeout(this.timeout);
    clearInterval(this.countdown);
    this.restartCountdown();

    if (this.isAnswerCorrect()) {
      this.passed();
    } else {
      this.failed();
    }

    if (this.isLastQuestion()) {
      this.recordScoresHistory();
      setTimeout(() => {
        if (this.isLastStage()) {
          if (this.isLastLevel()) {
            store.dispatch(gameOver('Игра окончена'));
            store.dispatch(testNewGame());
            setTimeout(() => {
              this.updateCurrentSession();
              this.setState({
                levelCompleted: true,
              });
            }, 2000);
          } else {
            store.dispatch(nextLevel('И еще один уровень'));
            store.dispatch(testNextLevel());
            setTimeout(() => {
              this.updateCurrentSession();
              this.setState({
                colors: [],
                figure: figures[Math.floor(Math.random() * figures.length)],
                percent: '0%',
                levelCompleted: true,
              });
            }, 2000);
          }
        } else {
          store.dispatch(nextStage('Следующий этап'));
          store.dispatch(testNextStage());
          this.updateCurrentSession();
          this.setState({
            colors: [],
            figure: figures[Math.floor(Math.random() * figures.length)],
            percent: '0%',
            stageCompleted: true,
          });
        }
      }, ANIMATION_CACTUS_TIME);
    } else {
      this.nextQuestion();
      this.clearInputField();
    }
  };

  isAnswerCorrect = () => {
    return (
      this.state.submitted &&
      this.state.value
        .trim()
        .toLowerCase()
        .replace(/'/g, '"') === this.state.correctAnswer
    );
  };

  isLastQuestion = () => {
    return store.getState().progress.total === this.state.numberOfQuestions;
  };

  isLastLevel = () => {
    return store.getState().gameStatus.levelCount === this.state.numberOfLevels;
  };

  isLastStage = () => {
    return store.getState().gameStatus.stageCount === this.state.numberOfStages;
  };

  timeout = () => {};

  countdown = () => {};

  restartCountdown = () => {
    this.setState({
      remainingTime:
        this.questionsList[store.getState().progress.total].responseTime / 1000,
    });
  };

  countRemainingTime = () => {
    if (this.state.remainingTime <= 0) {
      clearInterval(this.countdown);
    } else {
      this.setState({
        remainingTime: this.state.remainingTime - 1,
      });
    }
  };

  gameStatusChange = () => {
    if (store.getState().gameStatus.currentStatus === 'start') {
      this.setQuestionsNextLevel();
      store.dispatch(gamePlay());
    }

    if (store.getState().gameStatus.currentStatus === 'next_stage') {
      this.setQuestionsNextLevel();
      store.dispatch(gamePlay());
    }

    if (store.getState().gameStatus.currentStatus === 'next_level') {
      this.setQuestionsNextLevel();
      store.dispatch(gamePlay());
    }

    if (store.getState().gameStatus.currentStatus === 'end') {
      store.dispatch(gameStart('Начать игру'));
    }
  };

  updateLink = status => {
    if (status === 'end') {
      return {
        pathname: '/shelve',
        state: {
          user: this.state.user,
        },
      };
    } else {
      return {
        pathname: '/game',
        state: {
          user: this.state.user,
        },
      };
    }
  };

  muteSounds = () => {
    if (!this.state.muted) {
      this.beepSound.muted = true;
      this.correctAnswerSound.muted = true;
      this.wrongAnswerSound.muted = true;
      this.setState({
        muted: true,
      });
      return;
    }

    this.beepSound.muted = false;
    this.correctAnswerSound.muted = false;
    this.wrongAnswerSound.muted = false;
    this.setState({
      muted: false,
    });
  };

  handleInput = event => {
    this.setState({
      value: event.target.value,
    });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      if (store.getState().progress.total < this.state.numberOfQuestions) {
        this.setState(
          {
            submitted: true,
          },
          function() {
            this.handleInputChange();
          },
        );
      }
    }
  };

  render() {
    let playStatus = store.getState().gameStatus.playStatus;
    let currentStatus = store.getState().gameStatus.currentStatus;
    let zeroCellDisplay =
      this.state.questionType === 'selective' ? 'none' : 'block';
    let inputCellsWidth =
      this.state.questionType === 'selective' ? '50%' : '33%';
    let muteBtnStyle = this.state.muted ? 'mute-btn' : 'unmute-btn';
    if (this.state.levelCompleted) {
      return <Redirect push to="/shelve" />;
    }

    if (this.state.stageCompleted) {
      return <Redirect push to="/stages" />;
    }

    let question = [];

    for (let key in this.state.question) {
      question.push(this.state.question[key]);
    }

    let questionDescription = question.map((line, index) => {
      return <div key={index}>{question[index]}</div>;
    });

    return (
      <div className="game-wrapper game-component">
        <div className="header">
          <ProgressLine
            questions={this.state.numberOfQuestions}
            colors={this.state.colors}
          />
          <Link to="/menu" className="close-btn" />
        </div>
        <div
          className="game-component-body"
          style={{
            visibility: playStatus ? 'visible' : 'hidden',
          }}>
          <div className="question-answer-wrapper">
            <div className="question-field-wrapper">
              <div className="question-title">{this.state.questionTitle}</div>
              <div className="question-text">{questionDescription}</div>
            </div>
            <div>
              Additional Info:
              <a
                href={this.state.explanation}
                target="_blank"
                style={{textAlign: 'start'}}>
                link
              </a>
            </div>
            <div className="answer-field-wrapper">
              <div className="answer-time-count">
                {convertSecondsToTime(this.state.remainingTime)}
              </div>
              <div className={muteBtnStyle} onClick={this.muteSounds} />
              <div className="answer-field">
                <div className="answer-text">Ответ: </div>
                <div className="answer-input">
                  <input
                    type="text"
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleInput}
                    placeholder="your answer..."
                    autoFocus
                    value={this.state.value}
                    style={{height: '100%', outline: 'none'}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="keyboard"
          ref={node => {
            this.node = node;
          }}
          onClick={this.handleClick}>
          <div className="keyboard-row">
            <div
              className="keyboard-cell clear-cell"
              id="clear"
              onClick={this.handleBackspace}
              style={{width: '50vw'}}
            />
            <div
              className="keyboard-cell ok-cell"
              id="ok"
              onClick={this.onSubmit}
              style={{width: '50vw'}}>
              OK
            </div>
          </div>
          <audio
            ref={audio => {
              this.beepSound = audio;
            }}>
            <source src={beepSound} />
          </audio>
        </div>
        <div
          className="game-wrapper-overlay"
          style={{display: currentStatus === 'end' ? 'flex' : 'none'}}>
          <Link
            to={this.updateLink(store.getState().gameStatus.currentStatus)}
            className="game-btn"
            onClick={this.gameStatusChange}>
            <div className="init-button">
              {store.getState().gameStatus.actionText}
            </div>
          </Link>
        </div>
        <audio
          ref={audio => {
            this.correctAnswerSound = audio;
          }}>
          <source src={correctAnswerSound} />
        </audio>
        <audio
          ref={audio => {
            this.wrongAnswerSound = audio;
          }}>
          <source src={wrongAnswerSound} />
        </audio>
        <div
          className={
            'game-component__award game-component__award_' +
            (currentStatus === 'next_level' || currentStatus === 'end'
              ? 'visible'
              : 'hidden')
          }
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);
