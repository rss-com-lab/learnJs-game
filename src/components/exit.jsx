import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../style/app.css';

class Exit extends Component {
  render() {
    return (
      <div className="game-wrapper">
        <div className="header">
          <Link to="/menu" className="close-btn" />
        </div>
        <div className="temp-text">Exit page</div>
      </div>
    );
  }
}

export default Exit;
