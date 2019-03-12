import React, {Component} from 'react';
import '../style/app.css';
import {Route, Switch} from 'react-router-dom';

import Players from './players';
import Register from './register';
import Game from './game';
import Settings from './settings';
import Loading from './loading/loading';
import Menu from './menu/menu';
import Stages from './stages/stages';
import Shelve from './shelve/shelve';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Loading} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/player" component={Players} />
        <Route exact path="/stages" component={Stages} />
        <Route path="/register" component={Register} />
        <Route exact path="/game" component={Game} />
        <Route path="/settings" component={Settings} />
        <Route exact path="/shelve" component={Shelve} />
      </Switch>
    );
  }
}

export default App;
