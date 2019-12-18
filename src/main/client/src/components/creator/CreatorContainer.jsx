import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import NavigationBar from "./../navbar/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './CreatorContainer.scss';
import CreateSimulation from "./CreateSimulation";
import EditRecipe from "./EditRecipe";
import EditSimulation from "./EditSimulation";
import CreateRecipe from "./CreateRecipe";
import ViewMySimulations from "./ViewMySimulations";

export default class CreatorContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: "create",
      recipes: [],
      user: null,
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
    };
    {
      var globalThis = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/recipe/list');
      xhr.onload = function () {
        // do something to response
        var responseObject = null;
        try {
          responseObject = JSON.parse(this.responseText)
          globalThis.setState({ recipes: responseObject.recipes });
        } catch (e) {
          console.error("Got Non JSON response from server");
        }
      };
      xhr.send();
    }
    {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/simulation/list/mine');
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
    {
      var globalThis = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/user');
      xhr.onload = function () {
        // do something to response
        var responseObject = null;
        try {
          responseObject = JSON.parse(this.responseText)
          globalThis.setState({ user: responseObject.user });
        } catch (e) {
          console.error("Got Non JSON response from server");
        }
      };
      xhr.send();
    }
    this.deleteRecipeCallback = this.deleteRecipeCallback.bind(this);
    this.deleteSimulationCallback = this.deleteSimulationCallback.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  deleteRecipeCallback(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/recipe/delete');
    var formData = new FormData()
    formData.append("id", id);
    var globalThis = this
    xhr.onload = function () {
      if (this.status === 200) {
        var newList = []
        let recList = globalThis.state.recipes;
        for (var x of recList) {
          if (x.id != id) {
            newList.append(x);
          }
        }
        globalThis.setState({ recipes: newList })
      } else {
        console.log("Got error response code " + this.status + " when trying to delete");
      }
    };
    xhr.send(formData);
  }
  deleteSimulationCallback(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/simulation/delete');
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
      } else {
        console.log("Got error response code " + this.status + " when trying to delete");
      }
    };
    xhr.send(formData);
  }
  redirect(eventKey, event) {
    if (eventKey === "newRecipe") {
      this.props.history.push("/bartop/recipe/add");
      window.location.reload(true);
    } else {
      this.props.history.push("/creator/" + eventKey);
      window.location.reload(true);
    }
    // console.log(eventKey)
  }
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Tabs defaultActiveKey={(this.props.match.params.var1 == null || this.props.match.params.var1 == "") ? "create" : this.props.match.params.var1} transition={false} id="creator-tabs" onSelect={this.redirect} >
          <Tab eventKey="create" title="Create Simulation" />
          <Tab eventKey="edit" title="Edit Simulation" />
          <Tab eventKey="results" title="View Simulation Results" />
          <Tab eventKey="newRecipe" title="Create A New Recipe" />
        </Tabs>

        <Router>
          <Switch>
            <Route exact path="/creator/" render={(props) => <CreateSimulation {...props} user={this.state.user} recipes={this.state.recipes} deleteRecipeCallback={this.deleteRecipeCallback} />} />
            <Route exact path="/creator/create" render={(props) => <CreateSimulation {...props} user={this.state.user} recipes={this.state.recipes} deleteRecipeCallback={this.deleteRecipeCallback} />} />
            <Route exact path="/creator/edit" render={(props) => <EditSimulation {...props} />} />
            <Route exact path="/creator/results" render={(props) => <ViewMySimulations {...props} user={this.state.user} simulations={this.state.simulations} deleteSimulationCallback={this.deleteSimulationCallback} />} />
          </Switch>
        </Router>
      </React.Fragment>

      // <div>
      // <NavigationBar />
      // <Tabs defaultActiveKey="createSimulation" transition={false} id="creator-tabs">
      //   <Tab eventKey="createSimulation" title="Create Simulation">
      //     <CreateSimulation />
      //   </Tab>
      //   <Tab eventKey="editSimulation" title="Edit Simulation">
      //     <EditSimulation />
      //   </Tab>

      //   <Tab eventKey="viewMySimulations" title="View My Simulations">
      //     <ViewMySimulations />
      //   </Tab>
      // </Tabs>
      // </div>
    )
  }
}
