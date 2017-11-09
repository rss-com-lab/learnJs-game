import React, {Component} from 'react';

import '../style/app.css';

class Star extends Component {
  render() {
    let figuresArray = [
      <polygon
        points="100,10 40,198 190,78 10,78 160,198"
        fill="url(#gradient)"
      />,
      <circle cx="100" cy="100" r="100" fill="url(#gradient)" />,
      <polygon points="100,0 200,200 0,200" fill="url(#gradient)" />,
    ];

    let figure = figuresArray[this.props.figure];

    return (
      <div className="figure-container">
        <svg className="figure">
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="100%">
            <stop offset={this.props.percent} stopColor="#ffffff" />
            <stop offset={this.props.percent} stopColor="#35445c" />
          </linearGradient>

          {figure}
        </svg>
      </div>
    );
  }
}

export default Star;
