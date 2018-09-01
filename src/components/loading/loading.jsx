import React, {Component} from 'react';

import '../../style/app.css';
import './loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="game-wrapper">
        <div className="loading-screen">
          <div className="spinner">
            <div className="spinner__ring">
              <div className="spinner__circle" />
            </div>
          </div>
          <h2>Загрузка</h2>
        </div>
      </div>
    );
  }
}

export default Loading;
