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
      selectedSimulation: null,
      simulationResults: []
    };
    this.addSelectedSimulation = this.addSelectedSimulation.bind(this);
  }

  addSelectedSimulation(sim) {

    this.setState({ selectedSimulation: sim, simulationResults: [] });
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/simulation/grade/get');
    var formData = new FormData()
    formData.append("id", sim.id);
    var globalThis = this
    xhr.onload = function () {
      if (this.status === 200) {
        var gottenResults = JSON.parse(this.responseText).grades;
        console.log(gottenResults)
        for (var x of gottenResults) {
          var xhr2 = new XMLHttpRequest();
          xhr2.open('POST', '/user/get');
          var secondFormData = new FormData()
          secondFormData.append("id", x.userId);
          xhr2.onload = function () {
            if (this.status == 200) {
              var simulationResults = [];
              var user = JSON.parse(this.responseText).user;
              simulationResults.push({ email: user.email, score: x.jsonGrades, date: new Date(x.dateCompleted).toLocaleDateString() });
              globalThis.setState({ selectedSimulation: sim, simulationResults: simulationResults });
              console.log(user)
            }
          };
          xhr2.send(secondFormData);
        }
      } else {
        console.log("Got error response code " + this.status + " when trying to delete");
      }
    };
    xhr.send(formData);
  }

  render() {
    let simulationCards = this.props.simulations.map(simulation => {
      return (
        <div className="col-lg-4 col-md-3 col-sm-2 col-xs-1">
          <ViewMySimulationsSimulationCard key={simulation.title} user={this.props.user} simulation={simulation} onDeleteCallback={this.props.deleteSimulationCallback} addSimulationCallback={this.addSelectedSimulation} />
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
                    <ViewMySimulationsUsersTable user={this.props.user} simulationResults={this.state.simulationResults} />
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