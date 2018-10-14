import React, {Component} from 'react';

import ProgressLine from '../ProgressLine/ProgressLine';
import {
  CheckBtn,
  BackspaceBtn,
  CloseBtn,
  DigitBtn,
  FaqBtn,
} from '../Buttons/Buttons';

import {} from '@fortawesome/fontawesome-free-solid';

import './game.css';

class Game extends Component {
  render() {
    return (
      <div className="game-wrapper">
        <div className="game-header">
          <ProgressLine />
          <FaqBtn />
          <CloseBtn />
        </div>
        <div className="game-condition">2 + 2 =</div>
        <div className="game-answer">
          <div>Ответ: </div>
          <div className="game-answer__input">your answer</div>
        </div>
        <div className="game-keyboard">
          <CheckBtn />
          {Array(10)
            .fill('')
            .map((item, i) => (
              <DigitBtn key={i} value={i} />
            ))}
          <BackspaceBtn />
        </div>
      </div>
    );
  }
}

export default Game;
