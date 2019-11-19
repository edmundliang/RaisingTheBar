import React, { Component } from 'react'

import NavigationBar from "./NavigationBar";
import {Container, Jumbotron} from "react-bootstrap";

export default class Simulation extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Container>
          <Jumbotron>
            <h2>Simulation Page</h2>
          </Jumbotron>
        </Container>
      </React.Fragment>
    )
  }
}
