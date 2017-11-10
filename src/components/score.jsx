import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import closeBtn from '../img/close-btn.png';

import '../style/app.css';

class Score extends Component {
  renderHistoricResults = item => {
    let url = 'url(#' + item[1] + ')';

    let figuresArray = [
      <polygon
        className="star"
        points="100,10 40,198 190,78 10,78 160,198"
        fill={url}
      />,
      <circle className="circle" cx="100" cy="100" r="100" fill={url} />,
      <polygon className="triangle" points="100,0 200,200 0,200" fill={url} />,
    ];

    for (var i = 0; i < figuresArray.length; i++) {
      if (item[0] === figuresArray[i].props.className) {
        return figuresArray[i];
      }
    }
  };

  clearHistory = () => {
    localStorage.removeItem('history');
    this.forceUpdate();
  };

  render() {
    let scoresArray = JSON.parse(localStorage.getItem('history')) || [];

    return (
      <div className="game-wrapper">
        <div className="header">
          <Link to="/" className="close-btn">
            <img className="close-btn-image" src={closeBtn} alt={'Close'} />
          </Link>
        </div>
        <div className="historic-results-title">Достижения</div>
        <div className="historic-results">
          {scoresArray.map((item, index) => (
            <div className="historic-results-container" key={index}>
              <svg
                className="figure"
                viewBox="0 0 200 200"
                width="100%"
                height="100%"
                preserveAspectRatio="xMinYMinmeet">
                <linearGradient id={item[1]} x1="0" x2="0" y1="0" y2="100%">
                  <stop offset={item[1]} stopColor="#ffffff" />
                  <stop offset={item[1]} stopColor="#35445c" />
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
