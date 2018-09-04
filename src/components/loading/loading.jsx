import React, {Component} from 'react';
import {Redirect} from 'react-router';

import '../../style/app.css';
import './loading.css';

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  finishLoading = () => this.setState({isLoaded: true});

  componentDidMount() {
    setTimeout(this.finishLoading, 5000);
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
