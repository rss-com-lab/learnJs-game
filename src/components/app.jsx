import React, {Component} from 'react';
import '../style/app.css';
import {Router, Route, Switch} from 'react-router-dom';

import Players from './players';
import Register from './register';
import Game from './game';
import Settings from './settings';
import Loading from './loading/loading';
import Menu from './menu/menu';
import Stages from './stages/stages';
import Shelve from './shelve/shelve';
import history from '../history';

class App extends Component {
  componentDidMount() {
    window.sessionStorage.setItem('loaded', true);
  }

  render() {
    if (sessionStorage.getItem('loaded') && history.location.pathname !== '/') {
      window.sessionStorage.setItem('loaded', false);
      history.push('/');
    }

    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Loading />} />
            <Route exact path="/menu" render={() => <Menu />} />
            <Route exact path="/player" render={() => <Players />} />
            <Route exact path="/stages" render={() => <Stages />} />
            <Route path="/register" render={() => <Register />} />
            <Route exact path="/game" render={() => <Game />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route exact path="/shelve" render={() => <Shelve />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
