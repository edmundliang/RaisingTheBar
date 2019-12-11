import React, { Component } from 'react'
import NavigationBar from "./../navbar/NavigationBar";
import SimulationCard from "./SimulationCard";

export default class WorkshopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulations: [
        {
          title: "test title 1",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 2",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wiDescription example. wejti., rjewirje wiDescription example. wejti., rjewirje wiDescription example. wejti., rjewirje wi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 3",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 4",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 1",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 2",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje w ffffffffffffffffffffffffffffffffffffffffffffffffffffi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 3",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 4",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 2",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje w ffffffffffffffffffffffffffffffffffffffffffffffffffffi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 3",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 4",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 4",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje  fe  ef e fe fe fe e ef e",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 2",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje w ffffffffffffffffffffffffffffffffffffffffffffffffffffi",
          type: "Test",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 3",
          recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
          description: "Description example. wejti., rjewirje wi",
          type: "Practice",
          link: "https://www.youtube.com/",
        },
        {
          title: "test title 4",
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
          <SimulationCard key={simulation.title} simulation={simulation} />
        </div>
      )
    });

    return (
      <React.Fragment>
        <NavigationBar />
        <div className="container-fluid d-flex justify-content-center">
          <div className="row">
            {simulationCards}
          </div>
        </div>
      </React.Fragment>

    )
  }
}
