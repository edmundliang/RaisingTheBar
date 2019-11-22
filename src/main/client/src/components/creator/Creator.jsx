import React, { Component } from 'react'

import NavigationBar from "./../navbar/NavigationBar";
import {Container, Jumbotron} from "react-bootstrap";

export default class Creator extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Container>
          <Jumbotron>
            <h2>Creator Page</h2>
          </Jumbotron>
        </Container>
      </React.Fragment>
    )
  }
}
