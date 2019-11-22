import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import NavigationBar from "./../navbar/NavigationBar";
import './Home.scss';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
          <Jumbotron>
            <h2>Welcome to Raising the Bar!</h2>
            <p>This is the website for training a bartender.</p>
          </Jumbotron>
          <Link to="/simulation">
            <Button bsstyle="primary">Simulation</Button>
          </Link>
      </React.Fragment>
    );
  }
}