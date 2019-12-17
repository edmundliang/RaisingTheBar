import { Component } from "react";
import React from "react";
import ViewMySimulationsSimulationCard from "./ViewMySimulationsSimulationCard";
import { Col, Jumbotron } from "react-bootstrap";

export default class ViewMySimulations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulations: [
      //   {
      //     id: "1",
      //     name: "simmulation test 1",
      //     description: "first best simulation",
      //     "date": 1576382942151,
      //     "creator": "5df0fcd730778234fc4656fd",
      //     isPublic: true,
      //     isPractice: true,
      //     recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],

      //   },
      //   {
      //     id: "2",
      //     name: "simulation test 2",
      //     description: "second best simulation",
      //     "date": 1576382942151,
      //     "creator": "5df0fcd730778234fc4656fd",
      //     isPublic: false,
      //     isPractice: false,
      //   },
      //   {
      //     id: "3",
      //     name: "simmulation test 3",
      //     description: "third best simulation",
      //     "date": 1576382942151,
      //     "creator": "5df0fcd730778234fc4656fd",
      //     isPublic: true,
      //     isPractice: true,
      //   }
      ]
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/simulation/list/mine', true);
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

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onDeleteClick(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/simulation/delete', true);
    var formData = new FormData()
    formData.append("id", id);
    var globalThis = this
    xhr.onload = function () {

      if (this.status === 200) {
        var newList = []
        let simList = globalThis.state.simulations;
        for (var x of simList) {
          if (x.id != id) {
            newList.append(x);
          }
        }
        globalThis.setState({ simulations: newList })
      }else {
        console.log("Got resonse code " + this.status + " when trying to delete");
      }
    };
    xhr.send();
  }
  render() {
    let simulationCards = this.state.simulations.map(simulation => {
      return (
        <div className="col-lg-4 col-md-3 col-sm-2 col-xs-1">
          <ViewMySimulationsSimulationCard key={simulation.title} simulation={simulation} onDeleteCallback={this.onDeleteClick} />
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