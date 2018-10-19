import React, {Component} from 'react';
import {Redirect} from 'react-router';

import '../../style/app.css';
import './loading.css';

import {setLevelsConfig} from '../../ducks/levels';
import store from '../../store/store';

class Loading extends Component {
  state = {
    isLoaded: false,
  };

  finishLoading = () => this.setState({isLoaded: true});

  componentDidMount() {
    setTimeout(this.finishLoading, 5000);

    fetch('https://rawgit.com/ivan-kolesen/hello-world/master/levels.json')
      .then(result => result.json())
      .then(data => store.dispatch(setLevelsConfig(data)));
  }

  render() {
    if (this.state.isLoaded) {
      return <Redirect to="/menu" />;
    }

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
