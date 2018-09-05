import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store/store';

import '../../style/app.css';
import './stages.css';

class Stages extends Component {
  getStageNumber = () => {
    return store.getState().gameStatus.stageCount;
  };

  getLevelNumber = () => {
    return store.getState().gameStatus.levelCount;
  };

  render() {
    return (
      <div className="game-wrapper">
        <div className="stages-screen">
          <h3>
            stage {this.getStageNumber()} level {this.getLevelNumber()}
          </h3>
          <div className="stage-circle">
            <Link
              to={{
                pathname: '/game',
                state: {user: this.props.location.state.user},
              }}
              className="menu-link"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Stages;
