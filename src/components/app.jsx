import React, { Component } from "react";
import "../style/app.css";
import { Route, Switch } from "react-router-dom";

import Home from "./home";
import Game from "./game";
import Settings from "./settings";
import Score from "./score";
import Exit from "./exit";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/settings" component={Settings} />
        <Route path="/score" component={Score} />
        <Route path="/exit" component={Exit} />
      </Switch>
    );
  }
}

export default App;
