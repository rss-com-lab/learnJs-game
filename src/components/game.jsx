import React, { Component } from 'react'
import { Circle } from 'rc-progress'
import { Link } from 'react-router-dom'
import { createStore } from 'redux'
import reducer from '../reducers/index'

import { gameOver, gameStart, gamePlay, nextLevel } from '../actions/gamestatus_actions'
import { testPassed, testFailed, testReset } from '../actions/progress_actions'
import closeBtn from '../img/close-btn.png'
import { generateQuestionsList } from '../api/questions'
import { calculate } from '../api/calculate'

import '../style/app.css'

let questions = 5;
let store = createStore(reducer);
let maxNumber = store.getState().maxnumber;
let questionsList = generateQuestionsList(questions, maxNumber);

class Game extends Component {
  constructor() {
    super();
    this.state = {
      question: 'Сколько будет "' + questionsList[store.getState().progress.total] + '" ?',
      response: calculate(questionsList[store.getState().progress.total]),
      value: ''
    };
  }

  newQuestion = () => {
    console.log(store.getState());
    let ask = questionsList[store.getState().progress.total];
    let answer = calculate(ask);
    this.setState({
      question: 'Сколько будет "' + ask + '" ?',
      response: answer,
    }); 
  }

  clearInputField = () => {
    this.setState({
      value: ''
    });
  }

  componentDidMount = () => {
    this.node.addEventListener('click', this.handleClick);
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  passed = () => {
    store.dispatch(testPassed());
    store.dispatch(gamePlay());
  }

  failed = () => {
    store.dispatch(testFailed());
    store.dispatch(gamePlay());
  }

  gameOver = () => {
    store.dispatch(gameOver('Игра закончена'));
  }

  startGame = () => {
    store.dispatch(gameStart('Start Game'));
  }

  nextLevel = () => {
    store.dispatch(nextLevel());
  }

  componentWillUnmount = () => {
    this.node.removeEventListener('click', this.handleClick);
    this.unsubscribe();
  }

  handleClick = (e) => {
    if (this.node.contains(e.target) && e.target.innerHTML !== "submit") {
      this.setState({
        value: this.state.value + e.target.innerHTML
      });
    }
  }

  handleInputChange = () => {
    if (parseInt(this.state.value, 10) === this.state.response) {
      this.passed();
    } else {
      this.failed();
    }

    console.log(store.getState());

    if (store.getState().progress.total === questions && store.getState().gameStatus.levelCount < store.getState().complexity) {
      store.dispatch(testReset());
      console.log(store.getState().progress.total);
      store.dispatch(gameStart("И еще один уровень"));
      return;
    } 

    if (store.getState().progress.total === questions) {
      this.gameOver("Игра окончена");
      return;
    } 
    this.newQuestion(store.getState().progress.total);
    this.clearInputField();
  }


  gameStatusChange = () => {
    if (store.getState().gameStatus.currentStatus === 'start') {
      store.dispatch(gamePlay('Начать игру'));
    } 
  }

  render() {
    let percent = Math.round(store.getState().progress.passed/questions*100) || 0;
    let display = (store.getState().gameStatus.playStatus) ? "none" : "flex";
    let color = store.getState().progress.color ? '#f4ea77' : '#f73f38';

    return (

      <div className="game-wrapper">
      <div className="header">
      <Link to = "/" className="close-btn"><img className="close-btn-image" src={ closeBtn } alt={"Close"}/></Link>
      </div>
      <div className="success-chart-capture">Пройдено вопросов: { store.getState().progress.total } из { questions} </div>
      <div className="success-chart-capture">Из них успешно: { store.getState().progress.passed } </div>
      <Circle
      percent={percent}
      strokeWidth="6"
      strokeLinecap="round"
      strokeColor="#3463af"
      trailWidth="6"
      trailColor={color}
      />
      <div className="question-field">
      <div className="current-question">{this.state.question}</div>
      <div className="current-answer">Твой ответ: {this.state.value}</div>
      </div>
      <div className="keyboard" ref={node => {this.node = node}}>
      <div className="keyboard-row">
      <div className="keyboard-cell">7</div>
      <div className="keyboard-cell">8</div>
      <div className="keyboard-cell">9</div>           
      </div>
      <div className="keyboard-row">
      <div className="keyboard-cell">4</div>
      <div className="keyboard-cell">5</div>
      <div className="keyboard-cell">6</div>           
      </div>
      <div className="keyboard-row">
      <div className="keyboard-cell">1</div>
      <div className="keyboard-cell">2</div>
      <div className="keyboard-cell">3</div>           
      </div>
      <div className="keyboard-row">
      <div className="keyboard-cell">0</div>
      <div className="keyboard-cell">.</div>
      <div className="keyboard-cell" onClick={this.handleInputChange}>submit</div>
      </div>
      </div>
      <div className="game-wrapper-overlay" style={{display: display}}>
      <button className="init-button" onClick={this.gameStatusChange}>{store.getState().gameStatus.actionText}</button>
      </div>
      </div>

      );
  }
}

export default Game;

