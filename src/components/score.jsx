import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import store from "../store/store";
import closeBtn from "../img/close-btn.png";

import "../style/app.css";

const mapStateToProps = state => {
  return {
    timeout: state.timeout,
    progress: state.progress,
    complexity: state.complexity,
    maxnumber: state.maxnumber,
    gameStatus: state.gameStatus,
    gameResults: state.gameResults,
    timeUsed: state.timeUsed
  };
};

class Score extends Component {
  render() {
    let percent =
      store.getState().gameResults.tests === 0
        ? 0
        : store.getState().gameResults.tests * 100;
    return (
      <div className="game-wrapper">
        <div className="header">
          <Link to="/" className="close-btn">
            <img className="close-btn-image" src={closeBtn} alt={"Close"} />
          </Link>
        </div>
        <div>Привет, умничка!</div>
        <ul className="score-list">
          <li className="score-item">
            Ты прошел игру за {store.getState().gameResults.time} секунд
          </li>
          <li className="score-item">
            В игре было {store.getState().gameResults.levels} уровня
          </li>
          <li className="score-item">
            Ты ответил правильно на {percent}% вопросов
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Score);
