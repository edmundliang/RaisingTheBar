import React, { Component } from 'react'

import NavigationBar from "./../navbar/NavigationBar";
import {Button, Container, Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";

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
