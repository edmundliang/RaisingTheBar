import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import AuthContainer from './components/auth/AuthContainer';
import BartopContainer from './components/bartop/BartopContainer';
import CreatorContainer from './components/creator/CreatorContainer';
import Workshop from './components/workshop/Workshop';
import Results from './components/results/Results.jsx';
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
              <Route path="/bartop/:var1/:var2?/:var3?" component={BartopContainer} />
              <Route path="/creator" component={CreatorContainer} />
              <Route path="/workshop" component={Workshop} />
              <Route path="/results/:var1/:var2?/:var3?" component={Results} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
