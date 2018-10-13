import React, {Component} from 'react';

import ProgressLine from '../ProgressLine/ProgressLine';
import Button from '../Button/Button';

import {} from '@fortawesome/fontawesome-free-solid';

import './game.css';

class Game extends Component {
  render() {
    return (
      <div className="game-wrapper">
        <div className="game-header">
          <ProgressLine />
          <Button type="faq" />
          <Button type="close" />
        </div>
        <div className="game-condition" />
        <div className="game-answer" />
        <div className="game-keyboard" />
      </div>
    );
  }
}

export default Game;
