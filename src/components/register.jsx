import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

import store from '../store/store';
import {logInUser} from '../ducks/users';
import {complexitySelected} from '../ducks/complexity';

import '../style/app.css';

let testQuestions = ['10 x 2', '16 : 2'];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: '',
      nameSelectionStep: true,
      warningMessage: false,
      instructionsStep: false,
      complexitySelectionStep: false,
      setupCompleted: false,
      complexity: 1,
      questionNumber: 0,
    };
  }

  componentDidMount = () => {
    this.nameInput.focus();
  };

  handleChange = event => {
    this.setState({
      value:
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase(),
    });
  };

  nameProvided = e => {
    e.preventDefault();
    this.setState(
      {
        name: this.state.value,
      },
      () => {
        if (this.state.name === '') return;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        let isRegistered = users.some(elem => {
          return elem.name === this.state.name;
        });

        if (isRegistered === true) {
          this.setState({
            value: '',
            warningMessage: true,
          });

          return;
        }

        this.setState({
          nameSelectionStep: false,
          instructionsStep: true,
        });
      },
    );
  };

  instructionsRead = () => {
    this.setState({
      instructionsStep: false,
      value: '',
      complexitySelectionStep: true,
    });
  };

  isEasy = () => {
    this.setState(
      prevState => ({
        questionNumber: prevState.questionNumber + 1,
        complexity: prevState.complexity + 1,
      }),
      () => {
        this.islastQuestion();
        return;
      },
    );
  };

  isTough = () => {
    this.setState(
      prevState => ({
        questionNumber: prevState.questionNumber + 1,
        complexity: prevState.complexity,
      }),
      () => {
        this.islastQuestion();
        return;
      },
    );
  };

  islastQuestion = () => {
    if (this.state.questionNumber === testQuestions.length) {
      this.setState({
        setupCompleted: true,
      });
      let users = JSON.parse(localStorage.getItem('users')) || [];
      let currentUser = {
        name: this.state.name,
        score: [],
        complexity: this.state.complexity,
        currentSession: {
          level: 1,
          stage: 1,
          awards: 0,
          gamePassed: false,
        },
      };
      store.dispatch(logInUser(currentUser));
      store.dispatch(complexitySelected(this.state.complexity));
      users.push(currentUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  render() {
    let question = testQuestions[this.state.questionNumber];

    if (this.state.setupCompleted) {
      return <Redirect push to="/menu" />;
    }

    return (
      <div className="game-wrapper">
        <div className="header">
          <div
            className="header-greeting"
            style={{
              visibility: this.state.instructionsStep ? 'visible' : 'hidden',
            }}>
            Привет, {this.state.name}!
          </div>
          <Link to="/menu" className="close-btn" />
        </div>
        <div className="body">
          <form
            onSubmit={this.nameProvided}
            className="step step-one"
            style={{
              display: this.state.nameSelectionStep ? 'flex' : 'none',
            }}>
            <label className="step-one-label">
              Как тебя зовут?
              <input
                ref={input => {
                  this.nameInput = input;
                }}
                className="step-one-input"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <div
              className="warning-message"
              style={{
                display: this.state.warningMessage ? 'flex' : ' none',
              }}>
              Такое имя уже есть. Выбери другое
            </div>
            <input type="submit" value="" className="step-one-confirm-btn" />
          </form>
          <div
            className="step step-two"
            style={{
              display: this.state.instructionsStep ? 'flex' : ' none',
            }}>
            <div className="step-two-description">
              <p className="step-two-text">
                Давай подберем тебе уровень сложности.
              </p>
              <p className="step-two-text">
                Нажми на кнопку
                <span className="complexity-btn-image">Легко</span> если задание
                кажется тебе легким.
              </p>
              <p className="step-two-text">
                Или на кнопку
                <span className="complexity-btn-image tough">Сложно</span> если
                кажется сложным.
              </p>
            </div>
            <div
              className="step-two-confirm-btn"
              onClick={this.instructionsRead}
            />
          </div>
          <div
            className="step step-three"
            style={{
              display: this.state.complexitySelectionStep ? 'flex' : ' none',
            }}>
            <div className="step-three-title">
              Настраиваем уровень сложности
            </div>
            <div className="step-three-question">{question} = ?</div>
            <div className="complexity-setup-wrapper">
              <div className="complexity-btn-image" onClick={this.isEasy}>
                Легко
              </div>
              <div
                className="complexity-btn-image tough"
                onClick={this.isTough}>
                Сложно
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
