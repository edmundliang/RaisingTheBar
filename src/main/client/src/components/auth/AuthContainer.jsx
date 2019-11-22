import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

import './AuthContainer.scss';

export default class AuthContainer extends Component {
  render() {
    return (
      <Router>
        <div className="App theme-secondary-color">
          <div className="App__Aside theme-secondary-color"></div>
          <div className="App__Form theme-primary-color">
            <div className="PageSwitcher">
              <NavLink to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
              <NavLink exact to="/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="center">             
              <Route exact path="/signup" component={SignUpForm}></Route>
              <Route exact path="/login" component={LoginForm}></Route>
              <Route exact path="/forgot-password" component={ForgotPassword}></Route>
              <Route exact path="/reset-password" component={ResetPassword}></Route>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
