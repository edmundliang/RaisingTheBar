import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
// import { Container, Row, Col } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";
import CenterFold from "./CenterFold";
import Results from "./Results";

import './Simulation.scss';

import simulationTestJson from './simulation_test.json';

export default class SimulationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
    this.onSelectedChangeCallback = this.onSelectedChangeCallback.bind(this);
  }
  onSelectedChangeCallback(selectedIngredient) {
    this.setState({ selected: selectedIngredient });
    console.log(selectedIngredient);
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <div id="wrapper" className="center">

          <div id="sidebar-left">
            <IngredientsTable ingredients={simulationTestJson.ingredients} onSelectedChangeCallback={this.onSelectedChangeCallback} />
          </div>
          <div id="main">
            <CenterFold selected={this.state.selected} />
          </div>
          <div id="sidebar-right">
            <Results tasks={simulationTestJson.tasks} />
          </div>
        </div>


        {/* <Container fluid={true}>
          <Row>
            <Col>
              <IngredientsTable ingredients={simulationTestJson.ingredients} onSelectedChangeCallback={this.onSelectedChangeCallback} />
            </Col>
            <Col>
              <CenterFold />
            </Col>
            <Col>
              <Results tasks={simulationTestJson.tasks} />
            </Col>
          </Row>
        </Container> */}

      </React.Fragment>
    )
  }
}
