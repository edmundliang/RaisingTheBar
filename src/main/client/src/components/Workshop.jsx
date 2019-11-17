import React, { Component } from 'react'

import NavigationBar from "./NavigationBar";
import {Container, Jumbotron} from "react-bootstrap";

export default class Workshop extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Container>
          <Jumbotron>
            <h2>Workshop Page</h2>
          </Jumbotron>
        </Container>
      </React.Fragment>
    )
  }
}
