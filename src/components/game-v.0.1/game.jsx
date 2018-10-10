import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import CloseBtn from '../close-btn/close-btn';

import './game.css';

class Game extends Component {
  render() {
    return (
      <div className="game-wrapper">
        <div className="game-header">
          <CloseBtn />
        </div>
        <div className="game-condition" />
        <div className="game-answer" />
        <div className="game-keyboard" />
      </div>
    );
  }
}

export default Game;
