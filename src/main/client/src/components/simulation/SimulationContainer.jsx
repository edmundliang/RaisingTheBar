import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";
import Table from "./Table";
import SelectedItem from "./SelectedItem";

import '../Theme.scss';

import simulationTestJson from './simulation_test.json';

export default class SimulationContainer extends Component {

  onSelectedChangeCallback(selectedIngredient) {
    console.log(selectedIngredient);
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar />

        <Container>
          <Row>
            <Col>
              <IngredientsTable ingredients={simulationTestJson.ingredients} onSelectedChangeCallback={this.onSelectedChangeCallback} />
            </Col>
            <Col>
              <Row>
                <SelectedItem />
              </Row>
              <Row>
                <Table />
              </Row>
            </Col>
            <Col>
              <IngredientsTable ingredients={simulationTestJson.ingredients} onSelectedChangeCallback={this.onSelectedChangeCallback} />
            </Col>
          </Row>
        </Container>

      </React.Fragment>
    )
  }
}
