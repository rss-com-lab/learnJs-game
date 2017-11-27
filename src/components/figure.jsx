import React, {Component} from 'react';

import '../style/app.css';

class Figure extends Component {
  selectFigure = () => {
    let figuresArray = [
      <polygon
        className="star"
        points="100,10 40,198 190,78 10,78 160,198"
        fill="url(#gradient)"
      />,
      <circle
        className="circle"
        cx="100"
        cy="100"
        r="100"
        fill="url(#gradient)"
      />,
      <polygon
        className="triangle"
        points="100,0 200,200 0,200"
        fill="url(#gradient)"
      />,
    ];

    for (let i = 0; i < figuresArray.length; i++) {
      if (figuresArray[i].props.className === this.props.figure) {
        return figuresArray[i];
      }
    }
  };

  render() {
    return (
      <div className="figure-container">
        <svg
          className="figure"
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMinmeet">
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="100%">
            <stop offset={this.props.percent} stopColor="#f5f03f" />
            <stop offset={this.props.percent} stopColor="#aed4dc" />
          </linearGradient>

          {this.selectFigure()}
        </svg>
      </div>
    );
  }
}

export default Figure;
