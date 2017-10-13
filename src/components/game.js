import React, { Component } from 'react';
import { Circle } from 'rc-progress';
import { Link } from 'react-router-dom';
import { createStore } from 'redux';


import CloseBtn from '../img/close-btn.png';
import { askQuestion } from '../api/questions.js';
import { numberOfQuestions } from '../api/questions.js';


import '../style/app.css';


function reducer(state = { progress: 0, color: '#f4ea77' }, action) {
  switch (action.type) {
    case 'TEST_PASSED': return { progress: state.progress + action.step, color: action.color };
    case 'TEST_FAILED': return { progress: state.progress, color: action.color };
    case 'RESET': return { progress: 0, color: action.color };
    default: return state;
  }
}

let step = 100/(numberOfQuestions() + 1);
const passedTest = { type: 'TEST_PASSED', step: step, color: '#f4ea77'};
const failedTest = { type: 'TEST_FAILED', color: '#f73f38'};
const resetTest = { type: 'RESET', color: '#f4ea77' };

const store = createStore(reducer);



class Game extends Component {
  constructor() {
    super();

    this.state = {
      question: '1 + 1',
      response: 2,
      value: ''
    };
    this.newQuestion = this.newQuestion.bind(this);
    this.clearInputField = this.clearInputField.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.passed = this.passed.bind(this);
    this.failed = this.failed.bind(this);
    this.reset = this.reset.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  newQuestion() {
    let ask = askQuestion();
    let answer = eval(ask);
    
    this.setState({
      question: ask,
      response: answer,
    });
  }

  clearInputField() {
    this.setState({
      value: ''
    });
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  passed() {
    store.dispatch(passedTest);
    this.newQuestion();
    this.clearInputField();
  }

  failed() {
    store.dispatch(failedTest);
    this.clearInputField();
  }

  reset() {
    store.dispatch(resetTest);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
    this.unsubscribe();
  }

  handleClick(e) {
    if (this.node.contains(e.target) && e.target.innerHTML !== "submit") {
      this.setState({
        value: this.state.value + e.target.innerHTML
      });
    }
  }

  handleInputChange() {
    if (parseFloat(this.state.value, 2) === this.state.response) {
      this.passed();
      if (store.getState().progress >= 100) {
        this.reset();
      } else {
        return;
      }
    } else {
      this.failed();
    }
  }


  render() {
    let percent = store.getState().progress;
    let color = store.getState().color;

    return (
      <div className="game-wrapper">
        <div className="header">
          <Link to = "/" className="close-btn"><img className="close-btn-image" src={CloseBtn} alt={"Close"}/></Link>
        </div>
        <div className="success-chart-capture">Tests passed: { percent }% of 100% </div>
        <Circle
            percent={percent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeColor="#3463af"
            trailWidth="6"
            trailColor={color}
          />
        <div className="question-field">
          <div className="current-question">How much would it be "{this.state.question}"?</div>
          <div className="current-answer">Your answer: {this.state.value}</div>
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
      </div>
    );
  }
}

export default Game;

