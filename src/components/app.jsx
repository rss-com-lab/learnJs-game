import React, {Component} from 'react';
import '../style/app.css';
import {Route, Switch} from 'react-router-dom';

import Player from './player';
import Register from './register';
import Game from './game';
import Settings from './settings';
import Score from './score';
import Exit from './exit';
import Loading from './loading/loading';
import Menu from './menu/menu';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Loading} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/player" component={Player} />
        <Route path="/register" component={Register} />
        <Route exact path="/game" component={Game} />
        <Route path="/settings" component={Settings} />
        <Route path="/score" component={Score} />
        <Route path="/exit" component={Exit} />
      </Switch>
    );
  }
}

export default App;
