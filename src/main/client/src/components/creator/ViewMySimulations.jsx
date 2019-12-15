import { Component } from "react";
import React from "react";
import ViewMySimulationsSimulationCard from "./ViewMySimulationsSimulationCard";

export default class ViewMySimulations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulations: []
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/simulation/list', true);
    var globalThis = this
    xhr.onload = function () {
      // do something to response
      var responseObject = null;
      try {
        responseObject = JSON.parse(this.responseText)
        globalThis.setState({ simulations: responseObject.simulations });
      } catch (e) {
        console.error("Got Non JSON response from server");
      }
    };
    xhr.send();
  }

  render() {
    let simulationCards = this.state.simulations.map(simulation => {
      return (
        <div className="col-md-3">
          <ViewMySimulationsSimulationCard key={simulation.title} simulation={simulation} />
        </div>
      )
    });

    return (
      <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          {simulationCards}
        </div>
      </div>
    );
  }
}