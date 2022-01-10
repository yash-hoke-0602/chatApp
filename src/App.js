import React, { Component } from "react";
import Login from "./components/login";
import Home from "./components/home";
import Chat from "./components/chat";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/chat" exact component={Chat} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
