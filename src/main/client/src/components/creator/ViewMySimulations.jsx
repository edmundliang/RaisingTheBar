import { Component } from "react";
import React from "react";
import ViewMySimulationsSimulationCard from "./ViewMySimulationsSimulationCard";
import { Col, Jumbotron, Row } from "react-bootstrap";
import ViewMySimulationsUsersTable from "./ViewMySimulationsUsersTable";
import CreateSimulationInputForm from "./CreateSimulationInputForm";

export default class ViewMySimulations extends Component {
  constructor() {
    super();
    this.state = {
      selectedSimulation: null
    };
    this.addSelectedSimulation = this.addSelectedSimulation.bind(this);
  }

  addSelectedSimulation(sim) {
    this.setState({ selectedSimulation: sim })
  }

  render() {
    let simulationCards = this.props.simulations.map(simulation => {
      return (
        <div className="col-lg-4 col-md-3 col-sm-2 col-xs-1">
          <ViewMySimulationsSimulationCard key={simulation.title} user={this.props.user} simulation={simulation} onDeleteCallback={this.props.deleteSimulationCallback} addSimulationCallabck={this.addSelectedSimulation} />
        </div>
      )
    });
    return (
      <div className="mt-4 text-center container-fluid d-flex justify-content-center" >
        <Row className="custom-row" >
          <Col xs={12} md={8} >
            <Jumbotron fluid className="jumbo p-0" >
              <div className="left-container" >
                <Col className="mt-2" >
                  <div className="row p-1" >
                    {simulationCards}
                  </div>
                </Col >
              </div>
            </Jumbotron >
          </Col>
          <Col xs={6} md={4} >
            <Jumbotron fluid className="jumbo p-0" >
              <div className="right-container" >
                <Row>
                  <Col>
                    <ViewMySimulationsUsersTable user={this.props.user} selected={this.state.selectedSimulation} />
                  </Col>
                </Row>
              </div>
            </Jumbotron >
          </Col>
        </Row >
      </div>
    );
  }
}