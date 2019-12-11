import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import NavigationBar from "./../navbar/NavigationBar";
import './CreatorContainer.scss';
import CreateSimulation from "./CreateSimulation";
import EditRecipe from "./EditRecipe";
import EditSimulation from "./EditSimulation";
import CreateRecipe from "./CreateRecipe";
import ViewMySimulations from "./ViewMySimulations";

export default class CreatorContainer extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Tabs defaultActiveKey="createSimulation" transition={false} id="creator-tabs">
          <Tab eventKey="createSimulation" title="Create Simulation">
            <CreateSimulation/>
          </Tab>
          <Tab eventKey="editSimulation" title="Edit Simulation">
            <EditSimulation/>
          </Tab>
          <Tab eventKey="createRecipe" title="Create Recipe">
            <CreateRecipe/>
          </Tab>
          <Tab eventKey="editRecipe" title="Edit Recipe">
            <EditRecipe/>
          </Tab>
          <Tab eventKey="viewMySimulations" title="View My Simulations">
            <ViewMySimulations/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
