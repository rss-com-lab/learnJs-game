import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store/store';

import '../../style/app.css';
import './stages.css';

class Stages extends Component {
  getStageNumber = () => {
    return store.getState().currentUser.user.currentSession.stage;
  };

  getLevelNumber = () => {
    return store.getState().currentUser.user.currentSession.level;
  };

  getText = () => {
    return store.getState().gameStatus.actionText;
  };

  render() {
    return (
      <div className="game-wrapper">
        <div className="stages-screen">
          <div className="header">
            <h3>
              stage {this.getStageNumber()} level {this.getLevelNumber()}
            </h3>
            <Link to="/menu" className="close-btn" />
          </div>
          <h6>{this.getText()}</h6>
          <div className="stage-circle">
            <Link to="/game" className="menu-link" />
          </div>
        </div>
      </div>
    );
  }
}

export default Stages;
