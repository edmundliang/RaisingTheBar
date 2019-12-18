import { Component } from "react";
import React from "react";
import ViewMySimulationsSimulationCard from "./ViewMySimulationsSimulationCard";
import { Col, Jumbotron } from "react-bootstrap";

export default class ViewMySimulations extends Component {
  render() {
    let simulationCards = this.props.simulations.map(simulation => {
      return (
        <div className="col-lg-4 col-md-3 col-sm-2 col-xs-1">
          <ViewMySimulationsSimulationCard key={simulation.title} user={this.props.user} simulation={simulation} onDeleteCallback={this.props.deleteSimulationCallback} />
        </div>
      )
    });
    return (
      <Jumbotron fluid className="jumbo p-0 m-5">
        <Col className="mt-2 mb-4">
          <div className="row p-1">
            {simulationCards}
          </div>
        </Col>
      </Jumbotron>
    );
  }
}