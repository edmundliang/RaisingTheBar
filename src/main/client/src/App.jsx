import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import AuthContainer from './components/auth/AuthContainer';
import SimulationContainer from './components/simulation/SimulationContainer';
import Creator from './components/creator/Creator';
import Workshop from './components/workshop/Workshop';
import Recipe from './components/recipe/Recipe';
import NoMatch from './components/NoMatch';

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={AuthContainer} />
              <Route path="/signup" component={AuthContainer} />
              <Route path="/forgot-password" component={AuthContainer} />
              <Route path="/reset-password" component={AuthContainer} />
              <Route path="/simulation" component={SimulationContainer} />
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
