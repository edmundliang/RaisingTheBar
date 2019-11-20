import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';
import Simulation from './components/simulation/Simulation';
import Creator from './components/creator/Creator';
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
              <Route path="/login" component={Auth} />
              <Route path="/signup" component={Auth} />
              <Route path="/forgot-password" component={Auth} />
              <Route path="/reset-password" component={Auth} />
              <Route path="/simulation" component={Simulation} />
              <Route path="/creator" component={Creator} />
              <Route path="/workshop" component={Workshop} />
              <Route path="/recipe" component={Recipe} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
