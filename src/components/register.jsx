/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

import store from '../store/store';
import {logInUser} from '../ducks/users';
import {complexitySelected} from '../ducks/complexity';

import '../style/app.css';

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
      complexity: 1
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

  isBasic = () => {
    this.setState({
        complexity: 1
      },
      () => {
        this.setUser();
      },
    );
  };

  isIntermediate = () => {
    this.setState({
        complexity: 2,
      },
      () => {
        this.setUser();
      },
    );
  };

  isAdvanced = () => {
    this.setState({
        complexity: 3, 
      },
      () => {
        this.setUser();
      },
    );
  };

  setUser = () => {
      this.setState({
        setupCompleted: true,
        instructionsStep: false,
        value: '',
        complexitySelectionStep: true,
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
  };

  render() {
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
                Выбери уровень сложности для тренировки: <b>basic</b>, если
                хочешь потренировать базовые навыки JS, <b>intermediate</b>,
                если уже освоил основы и <b>advanced</b>, если хочешь настоящих
                испытаний!
              </p>
              <div className="step-two-text">
                <span className="complexity-btn-image" onClick={this.isBasic}>
                  Basic
                </span>
              </div>
              <div className="step-two-text">
                <span className="complexity-btn-image" onClick={this.isIntermediate}>
                  Intermediate
                </span>
              </div>
              <div className="step-two-text">
                <span className="complexity-btn-image tough" onClick={this.isAdvanced}>
                  Advanced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
