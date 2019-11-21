import React, { Component } from 'react'
import {Container, Jumbotron} from "react-bootstrap";
import NavigationBar from "./../navbar/NavigationBar";

export default class Recipe extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Container>
          <Jumbotron>
            <h2>Recipe Page</h2>
          </Jumbotron>
        </Container>
      </React.Fragment>
    )
  }
}
