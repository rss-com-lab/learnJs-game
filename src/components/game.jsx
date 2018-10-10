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
import Keyboard from './keyboard';

import beepSound from '../audio/Button-click-sound.mp3';
import correctAnswerSound from '../audio/Correct-answer-sound.mp3';
import wrongAnswerSound from '../audio/Wrong-answer-sound.mp3';

import {generateQuestionsList} from '../api/questions';
import {convertSecondsToTime} from '../api/convertSecondsToTime';
import '../style/app.css';
import {setCurrentUser} from '../ducks/users';

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
      user: store.getState().currentUser.name,
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
        response: this.questionsList[store.getState().progress.total]
          .correctAnswer,
        questionType: this.questionsList[store.getState().progress.total]
          .questionType,
        answers: this.questionsList[store.getState().progress.total].answers,
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
    this.node.addEventListener('click', this.handleClick);
    this.muteBtn.addEventListener('click', this.muteSounds);
    this.unsubscribe = store.subscribe(() => this.forceUpdate());

    fetch('https://rawgit.com/ivan-kolesen/hello-world/master/config.json')
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          maxNumber: data.complexity[store.getState().complexity].maxNumber,
          numberOfQuestions: data.numberOfQuestions,
          numberOfLevels: data.numberOfLevels,
          numberOfStages: data.numberOfStages,
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
    //this.node.removeEventListener('click', this.handleClick);
    //this.muteBtn.removeEventListener('click', this.muteSounds);
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

  setQuestionsNextLevel = data => {
    this.clearInputField();
    store.dispatch(testNextLevel());
    this.questionsList = generateQuestionsList(
      store.getState().complexity,
      this.state.config,
    );

    this.nextQuestion();
  };

  updateCurrentSession = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users = users.map(elem => {
      if (elem.name === this.state.user) {
        elem.currentSession.stage = store.getState().gameStatus.stageCount;
        elem.currentSession.level = store.getState().gameStatus.levelCount;
        if (
          store.getState().gameStatus.currentStatus === 'next_level' ||
          store.getState().gameStatus.currentStatus === 'end'
        ) {
          elem.currentSession.awards++;
        }
        this.setState({user: elem});
        store.dispatch(setCurrentUser(this.state.user));
      }
      return elem;
    });
    localStorage.setItem('users', JSON.stringify(users));
  };

  handleInputChange = () => {
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
      }, 500);
    } else {
      this.nextQuestion();
      this.clearInputField();
    }
  };

  isAnswerCorrect = () => {
    return (
      this.state.submitted &&
      parseInt(this.state.value, 10) === this.state.response
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
              <div className="question-title">Задача</div>
              <div className="question-text">{this.state.question}</div>
            </div>
            <div className="answer-field-wrapper">
              <div className="answer-time-count">
                {convertSecondsToTime(this.state.remainingTime)}
              </div>
              <div
                className={muteBtnStyle}
                ref={node => {
                  this.muteBtn = node;
                }}
              />
              <div className="answer-field">
                <div className="answer-text">Ответ: </div>
                <div className="answer-input">{this.state.value}</div>
              </div>
            </div>
          </div>
          <div
            className="keyboard"
            ref={node => {
              this.node = node;
            }}>
            <Keyboard
              questionType={this.state.questionType}
              answers={this.state.answers}
            />
            <div className="keyboard-row">
              <div
                className="keyboard-cell clear-cell"
                id="clear"
                onClick={this.handleBackspace}
                style={{width: inputCellsWidth}}
              />
              <div className="keyboard-cell" style={{display: zeroCellDisplay}}>
                0
              </div>
              <div
                className="keyboard-cell ok-cell"
                id="ok"
                onClick={this.onSubmit}
                style={{width: inputCellsWidth}}>
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
