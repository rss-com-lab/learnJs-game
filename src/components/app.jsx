import React, {Component} from 'react';
import '../style/app.css';
import {Route, Switch} from 'react-router-dom';

import Home from './home';
import Register from './register';
import Game from './game';
import Settings from './settings';
import Score from './score';
import Exit from './exit';
import Loading from './loading';
import Menu from './menu';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/" component={Menu} />
        <Route exact path="/player" component={Home} />
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
