import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../style/app.css';
import store from '../store/store';

class Score extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: store.getState().currentUser.name,
    };
  }

  renderHistoricResults = item => {
    let url = 'url(#' + item[1] + ')';

    let figuresArray = [
      <path
        className="star"
        d="m 169.33326,194.19041 c -10.09058,7.56793 -49.94021,-22.42368 
        -62.55198,-22.23219 -12.61177,0.19149 -51.532475,31.37914 -61.848171,24.12105 
        -10.315695,-7.2581 5.893813,-54.42527 1.81444,-66.3606 C 42.668175,117.78334 
        0.97980447,90.40506 4.6949343,78.351377 8.4100638,66.297695 58.277722,67.138396 
        68.368302,59.570461 78.458883,52.002525 91.614758,3.8941753 104.22653,3.7026807 
        116.8383,3.5111862 131.4487,51.197938 141.7644,58.45603 c 10.31569,7.258092 
        60.13484,4.903774 64.21421,16.839107 4.07938,11.935333 -36.75856,40.566663 
        -40.47369,52.620343 -3.71513,12.05369 13.91892,58.70699 3.82834,66.27493 z"
        fill={url}
        strokeWidth="10"
        stroke="#b5dbe3"
      />,
      <circle
        className="circle"
        cx="100"
        cy="100"
        r="90"
        strokeWidth="10"
        stroke="#b5dbe3"
        fill={url}
      />,
      <path
        className="flower"
        d="m 187.747 145.918 c -26.23565,61.25153 -70.15547,-34.16495 -76.35979,-29.06604 
        -6.20432,5.09891 65.68028,68.66715 3.81484,77.40443 -61.865462,8.73729 
        -11.62896,-74.09072 -18.31783,-77.0328 -7.351053,-3.23334 -23.290434,88.97047 
        -62.48729,44.36691 -39.19685648,-44.60356 55.46308,-56.56305 55.46308,-56.56305 0,0 
        -86.1925495,10.4465 -71.030098,-32.60772 21.738117,-61.726006 76.789622,19.61013 
        76.789622,19.61013 0,0 -55.252216,-74.036172 2.632366,-77.834266 57.88458,-3.79809 
        13.16005,79.181886 13.16005,79.181886 0,0 41.72824,-91.727568 71.0836,-40.498582 
        29.35533,51.228982 -65.80282,41.763482 -64.4892,49.686032 1.31363,7.92255 
        96.89357,-20.04001 69.74065,43.35307 z"
        fill={url}
        strokeWidth="10"
        stroke="#b5dbe3"
      />,
    ];

    for (var i = 0; i < figuresArray.length; i++) {
      if (item[0] === figuresArray[i].props.className) {
        return figuresArray[i];
      }
    }
  };

  clearHistory = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let currentUserData = users.filter(elem => {
      return elem.name === this.state.user;
    });

    let otherUsersData = users.filter(elem => {
      return elem.name !== this.state.user;
    });

    currentUserData[0].score = [];

    users = currentUserData.concat(otherUsersData);

    localStorage.setItem('users', JSON.stringify(users));
    this.forceUpdate();
  };

  getCurrentUserData = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let currentUserData = users.filter(elem => {
      return elem.name === this.state.user;
    });

    return currentUserData[0].score;
  };

  render() {
    let array = this.getCurrentUserData();

    return (
      <div className="game-wrapper">
        <div className="header header-empty">
          <Link to="/menu" className="close-btn" />
        </div>
        <div className="historic-results-title">Достижения</div>
        <div className="historic-results">
          {array.map((item, index) => (
            <div className="historic-results-container" key={index}>
              <svg
                className="figure"
                viewBox="-5 -5 220 220"
                width="100%"
                height="100%"
                preserveAspectRatio="xMinYMinmeet">
                <linearGradient id={item[1]} x1="0" x2="0" y1="0" y2="100%">
                  <stop offset={item[1]} stopColor="#ffffff" />
                  <stop offset={item[1]} stopColor="#f5f03f" />
                </linearGradient>
                {this.renderHistoricResults(item)}
              </svg>
            </div>
          ))}
        </div>
        <div className="clear-historic-results" onClick={this.clearHistory}>
          Очистить историю
        </div>
      </div>
    );
  }
}

export default Score;
