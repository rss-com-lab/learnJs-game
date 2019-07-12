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
  testStageAgain,
} from '../ducks/progress';
import {
  gameOver,
  gameStart,
  gamePlay,
  nextLevel,
  nextStage,
  stageAgain,
} from '../ducks/gamestatus';

import ProgressLine from './progress-line';
import beepSound from '../audio/Button-click-sound.mp3';
import correctAnswerSound from '../audio/Correct-answer-sound.mp3';
import wrongAnswerSound from '../audio/Wrong-answer-sound.mp3';

import {generateQuestionsList} from '../api/questions';
import {convertSecondsToTime} from '../api/convertSecondsToTime';
import {logInUser} from '../ducks/users';

import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs} from 'react-syntax-highlighter/dist/esm/styles/hljs';

import '../style/app.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = state => {
  return {
    progress: state.progress,
    gameStatus: state.gameStatus,
    currentUser: state.currentUser,
  };
};

const levelsConfig = [
  [2, 3, 4], // 2,3,4 - количество подряд отвеченных вопросов
  [2, 3, 3, 4], // вместо 2, 3 -  можно будет потом добавить сложность например
  // и будет тогда конфиг выглядеть как [2. [2, 1], [3, 1], [3, 2], [4, 1], [4, 2]], где 1 - 2 - сложность
  [3, 4, 3, 4, 4],
  [3, 4, 4, 4, 5],
  [3, 4, 5, 4, 5],
  [3, 4, 5, 5, 5],
];

const figures = ['star', 'circle', 'flower'];
const types = {open: 'open', close: 'close', closeMultiple: 'closeMultiple'};
const colors = {
  default: 'rgb(94, 154, 164)',
  active: 'rgb(119, 185, 196)',
  transparent: 'transparent',
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      user: store.getState().currentUser.user.name,
      value: null,
      submitted: false,
      remainingTime: 0,
      colors: [],
      figure: figures[Math.floor(Math.random() * figures.length)],
      percent: '0%',
      muted: false,
      stageCompleted: false,
      levelCompleted: false,
      answerWrong: true,
      openModalWindow: false,
      keyboardUpdate: false,
      stageWindow: false,
    };
  }

  handleOpenModalWindow = () => {
    this.setState({openModalWindow: true});
  };

  handleCloseModalWindow = () => {
    this.setState({openModalWindow: false});
  };

  nextQuestion = () => {
    if (this.questionsList.length !== 0) {
      this.setState(
        {
          question: this.questionsList[store.getState().progress.total]
            .question,
          questionType: this.questionsList[store.getState().progress.total]
            .questionType,
          explanation: this.questionsList[store.getState().progress.total]
            .explanation,
          questionTitle: this.questionsList[store.getState().progress.total]
            .questionTitle,
          correctAnswer: this.questionsList[store.getState().progress.total]
            .correctAnswer,
          answers: this.questionsList[
            store.getState().progress.total
          ].hasOwnProperty('answers')
            ? this.questionsList[store.getState().progress.total].answers
            : null,
          responseTime: this.questionsList[store.getState().progress.total]
            .responseTime,
          remainingTime:
            this.questionsList[store.getState().progress.total].responseTime /
              1000 || 300000,
        },
        () => {
          this.timeout = setTimeout(
            this.handleInputChange,
            this.state.responseTime,
          );
          this.countdown = setInterval(this.countRemainingTime, 1000);
        },
      );
    }
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
      'https://raw.githubusercontent.com/rss-com-lab/learnJs-game-data/master/questions-all-1.json',
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
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
    let answers = [this.state.figure, ''];

    users = users.map(elem => {
      if (elem.name === this.state.user) {
        elem.score.push(record);
        elem.correctAnswers.push(answers);
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
    if (this.state.questionType === types.open) {
      this.setState({
        value: e.target.value,
      });
    }

    if (this.state.questionType === types.close) {
      this.setState({
        value: e.target.innerText,
      });
      this.onSubmit();
    }

    if (this.state.questionType === types.closeMultiple) {
      if (e.target.className !== 'ok-cell--multiple') {
        let text = e.target.innerText;

        this.setState(prevState => {
          return {
            value:
              prevState.value.indexOf(text) !== -1
                ? this.state.value
                    .split(',,,')
                    .filter(value => {
                      return value !== text;
                    })
                    .join(',,,')
                : this.state.value + text + ',,,',
          };
        });
        e.target.style.backgroundColor === colors.transparent ||
        e.target.style.backgroundColor === colors.default
          ? (e.target.style.backgroundColor = colors.active)
          : (e.target.style.backgroundColor = colors.transparent);
      }
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
          keyboardUpdate: true,
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

    if (this.state.questionType === types.closeMultiple) {
      this.setState({
        keyboardUpdate: false,
      });
    }

    if (this.isAnswerCorrect()) {
      this.passed();
    } else {
      if (this.state.answerWrong) {
        this.wrongAnswerSound.play();
        this.handleOpenModalWindow();
        this.setState((state, props) => {
          return {
            answerWrong: false,
          };
        });
        return false;
      } else {
        this.handleCloseModalWindow();
        this.failed();
        this.setState((state, props) => {
          return {
            answerWrong: true,
          };
        });
      }
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
            store.dispatch(nextLevel('Новый уровень'));
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
          if (
            store.getState().progress.passed <
            levelsConfig[
              store.getState().currentUser.user.currentSession.level - 1
            ][store.getState().currentUser.user.currentSession.stage - 1]
          ) {
            store.dispatch(stageAgain('Вы не прошли текущий этап'));
            store.dispatch(testStageAgain());
            this.setState({
              colors: [],
              figure: figures[Math.floor(Math.random() * figures.length)],
              percent: '0%',
              stageCompleted: true,
            });
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
        }
      }, ANIMATION_CACTUS_TIME);
    } else {
      this.nextQuestion();
      this.clearInputField();
    }
  };

  isAnswerCorrect = () => {
    if (this.state.submitted) {
      if (this.state.questionType === types.open) {
        return (
          this.state.value
            .trim()
            .toLowerCase()
            .replace(/'/g, '"')
            .replace(/\s/g, '') ===
          this.state.correctAnswer
            .trim()
            .toLowerCase()
            .replace(/'/g, '"')
            .replace(/\s/g, '')
        );
      }

      if (this.state.questionType === types.close) {
        return this.state.value === this.state.correctAnswer.toString();
      }

      if (this.state.questionType === types.closeMultiple) {
        if (Array.isArray(this.state.correctAnswer)) {
          return this.state.correctAnswer.every(answer => {
            return (
              this.state.value.indexOf(answer) !== -1 &&
              this.state.value.split(',,,').length - 1 ===
                this.state.correctAnswer.length
            );
          });
        }
      }
    }
    return false;
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

    if (store.getState().gameStatus.currentStatus === 'stage_again') {
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
      this.onSubmit();
    }
  };

  keyboard = questionType => {
    switch (questionType) {
      case types.open:
        return (
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
        );
      case types.close:
        return (
          <div
            onClick={this.handleClick}
            style={{
              borderBottom: '3px solid #b1d4df',
              backgroundColor: '#5e9aa4',
            }}>
            {this.state.answers.map((answer, index) => {
              return (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    borderTop: '3px solid #b1d4df',
                  }}>
                  {answer}
                </div>
              );
            })}
          </div>
        );
      case types.closeMultiple:
        return (
          <div
            onClick={this.handleClick}
            style={{
              borderBottom: '3px solid #b1d4df',
              backgroundColor: colors.default,
            }}>
            {this.state.answers.map((answer, index) => {
              return (
                <div
                  key={index}
                  style={{
                    dataUpdate: `${this.state.keyboardUpdate}`,
                    textAlign: 'center',
                    borderTop: '3px solid #b1d4df',
                    backgroundColor: this.state.keyboardUpdate
                      ? colors.transparent
                      : colors.default,
                  }}>
                  {answer}
                </div>
              );
            })}
          </div>
        );
      default:
        return <div />;
    }
  };

  panel = questionType => {
    switch (questionType) {
      case types.open:
        return (
          <div className="answer-field">
            <div className="answer-text">Ответ: </div>
            <div className="answer-input">
              <input
                type="text"
                onKeyPress={this.handleKeyPress}
                //onChange={this.handleInput}
                onChange={this.handleClick}
                placeholder="your answer..."
                autoFocus
                value={this.state.value}
                style={{height: '100%', outline: 'none'}}
              />
            </div>
          </div>
        );
      case types.close:
        return null;
      case types.closeMultiple:
        return (
          <div
            className="ok-cell--multiple"
            onClick={this.onSubmit}
            style={{
              height: '90%',
              width: '50%',
              backgroundColor: '#e6b3ff',
              textAlign: 'center',
            }}>
            OK
          </div>
        );
      default:
        return <div />;
    }
  };

  render() {
    let playStatus = store.getState().gameStatus.playStatus;
    let currentStatus = store.getState().gameStatus.currentStatus;
    let muteBtnStyle = this.state.muted ? 'mute-btn' : 'unmute-btn';
    if (this.state.levelCompleted) {
      return <Redirect push to="/shelve" />;
    }
    if (this.state.stageCompleted) {
      return <Redirect push to="/stages" />;
    }

    const questionDescription = this.state.question ? (
      <SyntaxHighlighter language="javascript" style={vs}>
        {this.state.question.reduce((sum, item) => sum + `${item}\n`, '')}
      </SyntaxHighlighter>
    ) : (
      this.state.question
    );

    return (
      <div
        className="game-wrapper game-component"
        onKeyPress={this.handleKeyPress}>
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
              {this.panel(this.state.questionType)}
            </div>
          </div>
        </div>
        <div
          className="keyboard"
          ref={node => {
            this.node = node;
          }}>
          {this.keyboard(this.state.questionType)}
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
        <Dialog
          open={this.state.openModalWindow}
          onClose={this.handleCloseModalWindow}
          disableBackdropClick={true}>
          <DialogTitle id="max-width-dialog-title">
            Правильный ответ:
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.correctAnswer}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleInputChange} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);
