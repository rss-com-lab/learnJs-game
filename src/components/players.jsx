import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../style/app.css';
import {logInUser} from '../ducks/users';
import store from '../store/store';

class Players extends Component {
  sortArray = array => {
    if (array.length === 0) return 0;
    let scoresArray = array.map(elem => {
      return elem[1].split('%').shift();
    });

    let sortedArray = scoresArray.sort(function(a, b) {
      return b - a;
    });
    return sortedArray[0];
  };

  checkFigure = (array, index) => {
    let url = 'url(#' + index + ')';

    if (array.length === 0) {
      return (
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
        />
      );
    }

    let score = this.sortArray(array) + '%';
    let figureArray = array.filter(elem => {
      return elem[1] === score;
    });

    let figure = figureArray[0][0];

    switch (figure) {
      case 'circle':
        return (
          <circle
            className="circle"
            cx="100"
            cy="100"
            r="90"
            strokeWidth="10"
            stroke="#b5dbe3"
            fill={url}
          />
        );
      case 'star':
        return (
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
          />
        );
      case 'flower':
        return (
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
          />
        );
      default:
        return (
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
          />
        );
    }
  };

  handlePlayerChoice = player => store.dispatch(logInUser(player));

  render() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    return (
      <div className="game-wrapper">
        {
          <div className="players-list">
            <Link to="/menu" className="close-btn" />
            <Link to="/register" className="menu-link">
              Новый игрок
            </Link>
            {users.map((item, index) => (
              <div className="player" key={index}>
                <Link to="/menu" className="menu-link">
                  <div
                    className="player-name"
                    onClick={this.handlePlayerChoice.bind(null, item)}>
                    {item.name}
                  </div>
                </Link>
                <Link
                  to={{
                    pathname: '/score',
                    state: {user: item.name},
                  }}
                  className="menu-link">
                  <div className="player-best-score">
                    <div>{this.sortArray(item.score, index)}</div>
                    <div className="best-score-figure-container">
                      <svg
                        className="figure"
                        viewBox="0 0 210 210"
                        preserveAspectRatio="xMinYMin meet">
                        <linearGradient
                          id={index}
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="100%">
                          <stop
                            offset={this.sortArray(item.score) + '%'}
                            stopColor="#ffffff"
                          />
                          <stop
                            offset={this.sortArray(item.score) + '%'}
                            stopColor="#f5f03f"
                          />
                        </linearGradient>
                        {this.checkFigure(item.score, index)}
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}

export default Players;
