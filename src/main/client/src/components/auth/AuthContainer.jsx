import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

import './AuthContainer.scss';

export default class AuthContainer extends Component {
  constructor() {
    super();
    this.redirectCallback = this.redirectCallback.bind(this);
  }
  redirectCallback(url) {
    if(url == null) {
      this.props.history.goBack();
    }else {
      this.props.history.push(url);
    }
  }
  render() {
    return (
      <Router>
        <div className="App theme-secondary-color">
          <div className="App__Aside theme-secondary-color"></div>
          <div className="App__Form theme-primary-color">
            <div className="PageSwitcher">
              <NavLink to="/user/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
              <NavLink exact to="/user/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="center">
              <Route exact path="/user/signup" render={()=><SignUpForm redirectCallback={this.redirectCallback} />}></Route>
              <Route exact path="/user/login" render={()=><LoginForm redirectCallback={this.redirectCallback} />}></Route>
              <Route exact path="/user/forgot-password" component={ForgotPassword}></Route>
              <Route exact path="/user/reset-password" component={ResetPassword}></Route>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
