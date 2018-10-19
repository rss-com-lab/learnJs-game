import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store/store';

import '../../style/app.css';
import './shelve.css';

const PI = 3.14;
const radius = 35;
const circleLength = 2 * PI * radius;
const space = 1;

class Shelve extends Component {
  getFirstLayerDashArray = () => {
    const numberOfStages = store.getState().levels.config[
      store.getState().currentUser.user.currentSession.level - 1
    ].stages.length;
    const numberOfCompletedStages =
      store.getState().currentUser.user.currentSession.stage - 1;
    const paintedPartOfCircle =
      (circleLength / numberOfStages) * numberOfCompletedStages +
      (numberOfCompletedStages && space);
    const unpaintedPartOfCircle = circleLength - paintedPartOfCircle - space;

    return `${paintedPartOfCircle}% ${unpaintedPartOfCircle}%`;
  };

  getSecondLayerDashArray = () => {
    const numberOfStages = store.getState().levels.config[
      store.getState().currentUser.user.currentSession.level - 1
    ].stages.length;
    const numberOfCompletedStages =
      store.getState().currentUser.user.currentSession.stage - 1;
    const paintedPartOfCircle = circleLength / numberOfStages - space * 2;
    const unpaintedPartOfCircle =
      (circleLength / numberOfStages) *
      (numberOfStages - numberOfCompletedStages);

    let dasharray = '0';

    for (let i = 0; i < numberOfCompletedStages; i++) {
      dasharray = `${dasharray} ${space * 2}% ${paintedPartOfCircle}%`;
    }

    dasharray = `${dasharray} ${unpaintedPartOfCircle}%`;

    return dasharray;
  };

  getFirstLayerDashOffset = () => `${circleLength / 4}%`;

  getSecondLayerDashOffset = () => `${circleLength / 4 + space}%`;

  render() {
    const numberOfRewards = 28;

    return (
      <div className="game-wrapper">
        <div className="shelve-screen">
          <div className="shelve-header">
            <Link to="/menu" className="close-btn" />
          </div>
          <div className="shelve-main">
            {Array(numberOfRewards)
              .fill('')
              .map((item, i) => (
                <div className="shelve-cell" key={i + 1}>
                  <div
                    className="shelve-digit"
                    style={
                      i <=
                      store.getState().currentUser.user.currentSession.awards
                        ? {display: 'none'}
                        : null
                    }>
                    {i + 1}
                  </div>
                  <div
                    className="award-progress"
                    style={
                      i ===
                      store.getState().currentUser.user.currentSession.awards
                        ? {display: 'block'}
                        : {display: 'none'}
                    }>
                    <svg width="100%" height="100%">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="35%"
                        fill="#ffd14f"
                        stroke="#ffd14f"
                        strokeWidth="20%"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="35%"
                        fill="#ffd14f"
                        stroke="#fff"
                        strokeWidth="20%"
                        strokeDasharray={this.getFirstLayerDashArray()}
                        strokeDashoffset={this.getFirstLayerDashOffset()}
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="35%"
                        fill="#ffd14f"
                        stroke="#00b3c7"
                        strokeWidth="20%"
                        strokeDasharray={this.getSecondLayerDashArray()}
                        strokeDashoffset={this.getSecondLayerDashOffset()}
                      />
                      <circle cx="50%" cy="50%" r="35%" fill="#ffd14f" />
                      <text fill="#000" fontSize="45" x="36%" y="72%">
                        ?
                      </text>
                    </svg>
                  </div>
                  <div
                    className="award"
                    style={
                      i <
                      store.getState().currentUser.user.currentSession.awards
                        ? {display: 'block'}
                        : null
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Shelve;
