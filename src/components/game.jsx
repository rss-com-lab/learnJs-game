import React, { Component } from 'react'
import { Circle } from 'rc-progress'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import store from '../store/store'
import { testPassed, testFailed, testNewGame, testNextLevel } from '../ducks/progress'
import { gameOver, gameStart, gamePlay, nextLevel } from '../ducks/gamestatus'
import { timeUsed, clearTimeUsed } from '../ducks/timeused'
import { setScore, clearScore } from '../ducks/gameresults'

import closeBtn from '../img/close-btn.png'
import { generateQuestionsList } from '../api/questions'
import { calculate } from '../api/calculate'

import '../style/app.css'

const mapStateToProps = (state) => {
	return {
		progress: state.progress,
		gameStatus: state.gameStatus,
		gameResults: state.gameResults,
		gameTime: state.gameTime
	}
}

class Game extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
			submitted: false,
			operators: [],
			maxNumber: 0,
			numberOfQuestions: 0,
			numberOfLevels: 0
		};


	}

	nextQuestion = () => {
		this.timeout = setTimeout(this.handleInputChange, store.getState().timeout * 1000);
		let ask = this.questionsList[store.getState().progress.total];
		let answer = calculate(ask);
		this.setState({
			question: 'Сколько будет "' + ask + '" ?',
			response: answer,
		}); 
	}

	clearInputField = () => {
		this.setState({
			value: '',
			submitted: false
		});
	}

	componentDidMount = () => {
		this.node.addEventListener('click', this.handleClick);
		this.unsubscribe = store.subscribe(() => this.forceUpdate());

		fetch('https://rawgit.com/AlesiaGit/math-game-web/01/src/config.json')
		.then(results => {
			return results.json();
		}).then(data => {
			let operators = data.complexity[store.getState().complexity].operators;
			let maxNumber = data.complexity[store.getState().complexity].maxNumber;
			let numberOfLevels = data.numberOfLevels;
			let numberOfQuestions = data.numberOfQuestions;
			this.setState({
				operators: operators,
				maxNumber: maxNumber,
				numberOfQuestions: numberOfQuestions,
				numberOfLevels: numberOfLevels
			})
		})		
	}

	passed = () => {
		store.dispatch(testPassed());
		store.dispatch(gamePlay());
		this.recordResult();
	}

	failed = () => {
		store.dispatch(testFailed());
		store.dispatch(gamePlay());
		this.recordResult();
	}

	recordResult = () => {
		let time = store.getState().gameTime;
		let levels = store.getState().gameStatus.levelCount;
		let tests = (store.getState().progress.gamePassed/store.getState().progress.gameTotal).toFixed(2);
		store.dispatch(setScore(time, levels, tests));
	}

	componentWillUnmount = () => {
		this.node.removeEventListener('click', this.handleClick);
		this.unsubscribe();
		clearTimeout(this.timeout);
		clearInterval(this.timer);
		store.dispatch(testNewGame());
		store.dispatch(clearTimeUsed());
		store.dispatch(gameStart("Начать игру"));
	}

	handleClick = (e) => {
		if (this.node.contains(e.target) && e.target.innerHTML !== "ответить" &&  e.target.innerHTML !== "назад") {
			this.setState({
				value: this.state.value + e.target.innerHTML
			});
		}
	}

	handleBackspace = () => {
		this.setState({
			value: this.state.value.slice(0, -1)
		});
	}

	onSubmit = () => {
		if (store.getState().progress.total < this.state.numberOfQuestions) {
			this.setState({
				submitted: true
			}, function() {
				this.handleInputChange();
			});
		}
	}

	setQuestionsNextLevel = () => {
		this.clearInputField();
		store.dispatch(testNextLevel());
		this.questionsList = generateQuestionsList(this.state.numberOfQuestions, this.state.maxNumber, this.state.operators);
		
		this.nextQuestion();      	
	}

	handleInputChange = () => {
		clearTimeout(this.timeout);

		if (this.isAnswerCorrect()) {
			this.passed();
		} else {
			this.failed();
		}

		if (this.isLastQuestion()) {
			setTimeout(() => {
				clearInterval(this.timer);
			
				if (this.isLastLevel()) {
					store.dispatch(gameOver("Игра окончена")); 
					store.dispatch(testNewGame());
					store.dispatch(clearTimeUsed());
				} else {
					store.dispatch(nextLevel("И еще один уровень")); 
					store.dispatch(testNextLevel());
				} 
			}, 1000);

		} else {
			this.nextQuestion();
			this.clearInputField();   
		}  
	}

	isAnswerCorrect = () => {
		return this.state.submitted && parseInt(this.state.value, 10) === this.state.response;
	}

	isLastQuestion = () => {
		return store.getState().progress.total === this.state.numberOfQuestions;
	}

	isLastLevel = () => {
		return store.getState().gameStatus.levelCount === this.state.numberOfLevels;
	}

	timeout = () => {}

	timer = {}

	countAnswerTime = () => {
		store.dispatch(timeUsed());
	} 

	gameStatusChange = () => {
		if (store.getState().gameStatus.currentStatus === 'start') {
			this.setQuestionsNextLevel();
			store.dispatch(clearTimeUsed());
			store.dispatch(clearScore());
			store.dispatch(gamePlay());
			this.timer = setInterval(this.countAnswerTime, 1000);
		}

		if (store.getState().gameStatus.currentStatus === 'next') {
			this.setQuestionsNextLevel();
			store.dispatch(gamePlay());
			this.timer = setInterval(this.countAnswerTime, 1000);
		}

		if (store.getState().gameStatus.currentStatus === 'end') {
			store.dispatch(gameStart("Начать игру"));
		}
	}

	render() {
		let percent = Math.round(store.getState().progress.passed/this.state.numberOfQuestions * 100) || 0;
		let display = (store.getState().gameStatus.playStatus) ? "none" : "flex";
		let color = store.getState().progress.color ? '#f4ea77' : '#f73f38';
		let link = store.getState().gameStatus.currentStatus === 'end' ? "/score" : "/game";

    return (

      <div className="game-wrapper">
        <div className="header">
          <Link to = "/" className="close-btn"><img className="close-btn-image" src={ closeBtn } alt={"Close"}/></Link>
        </div>
        <div className="success-chart-capture">Пройдено вопросов: { store.getState().progress.total } из { this.state.numberOfQuestions }</div>
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
            <div className="keyboard-cell" onClick={this.handleBackspace}>назад</div>
            <div className="keyboard-cell" onClick={this.onSubmit}>ответить</div>
          </div>
        </div>
        <div className="game-wrapper-overlay" style={{display: display}}>
          	<Link to = { link } className="game-btn" onClick={this.gameStatusChange}>
          		<div className="init-button" >{store.getState().gameStatus.actionText}</div>
          	</Link>
        </div>
      </div>

      );
  }
}

export default connect(mapStateToProps)(Game);

