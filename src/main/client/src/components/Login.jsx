import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

import './Login.css';
import './Theme.css';

export default class Login extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <div className="App__Aside theme-secondary-color"></div>
            <div className="App__Form theme-primary-color">
              <div className="PageSwitcher">
                <NavLink to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
                <NavLink exact to="/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Login</NavLink> or <NavLink exact to="/signup" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/signup" component={SignUpForm}>
              </Route>
              <Route exact path="/login" component={SignInForm}>
              </Route>
            </div>
          </div>
        </Router>
    );
  }
}
