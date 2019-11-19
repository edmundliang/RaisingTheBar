import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Simulation from './components/Simulation';
import Creator from './components/Creator';
import Workshop from './components/Workshop';
import Recipe from './components/Recipe';
import NoMatch from './components/NoMatch';

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={Login} />
              <Route path="/simulation" component={Simulation} />
              <Route path="/creator" component={Creator} />
              <Route path="/workshop" component={Workshop} />
              <Route path="/recipe" component={Recipe} />
              <Route path="/forgot-password" component={Home} />
              <Route path="/reset-password" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
