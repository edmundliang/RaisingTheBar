import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
import { Container } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";
import '../Theme.css';

export default class Simulation extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />

        <Container>
          <div className="titleBar"> Title Bar</div>
          <IngredientsTable id="leftPanel"></IngredientsTable>
          <div className="centerPanel">
            <div className="selectWindow"></div>
            <div className="table"></div>
          </div>
          <div className="rightPanel"></div>
        </Container>

      </React.Fragment>
    )
  }
}
