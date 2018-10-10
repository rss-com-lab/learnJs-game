import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store/store';

import '../../style/app.css';
import './shelve.css';

class Shelve extends Component {
  state = {
    user: store.getState().currentUser,
  };

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
                      i < this.state.user.currentSession.awards
                        ? {display: 'none'}
                        : null
                    }>
                    {i + 1}
                  </div>
                  <div
                    className="award"
                    style={
                      i < this.state.user.currentSession.awards
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
