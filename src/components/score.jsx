import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import closeBtn from '../img/close-btn.png';

import '../style/app.css';

class Score extends Component {
  render() {
    return (
      <div className="game-wrapper">
        <div className="header">
          <Link to = "/" className="close-btn"><img className="close-btn-image" src={closeBtn} alt={"Close"}/></Link>
        </div>
        <div className="temp-text">Score page</div>
      </div>
    );
  }
}

export default Score;