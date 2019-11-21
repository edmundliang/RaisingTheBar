import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';
import NavigationBar from "./../navbar/NavigationBar";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Container>
          <Jumbotron>
            <h2>Welcome to Raising the Bar!</h2>
            <p>This is the website for training a bartender.</p>
          </Jumbotron>
          <Link to="/simulation">
            <Button bsStyle="primary">Simulation</Button>
          </Link>
        </Container>
      </React.Fragment>
    );
  }
}