import {Component} from "react";
import React from "react";
import ViewMySimulationsSimulationCard from "./ViewMySimulationsSimulationCard";

export default class ViewMySimulations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulations: [
        {
          title: "Simulation title 1",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 2",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wiDescription example. wejti., rjewirje wiDescription example. wejti., rjewirje wiDescription example. wejti., rjewirje wi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 3",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 4",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 5",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 6",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje w ffffffffffffffffffffffffffffffffffffffffffffffffffffi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 7",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 8",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 9",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje w ffffffffffffffffffffffffffffffffffffffffffffffffffffi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 10",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 11",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 12",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 13",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje w ffffffffffffffffffffffffffffffffffffffffffffffffffffi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 14",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "Simulation title 15",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
      ]
    }
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