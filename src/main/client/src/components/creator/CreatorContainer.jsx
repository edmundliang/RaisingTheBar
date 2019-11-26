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
        <Tabs defaultActiveKey="createSimulation" transition={false} id="tab-example">
          <Tab eventKey="createSimulation" title="Create Simulation">
            This tab is for creating simulations
          </Tab>
          <Tab eventKey="editSimulation" title="Edit Simulation">
            This tab is for editing simulations
          </Tab>
          <Tab eventKey="createRecipe" title="Create Recipe">
            This tab is for creating recipes
          </Tab>
          <Tab eventKey="editRecipe" title="Edit Recipe">
            This tab is for editing recipes
          </Tab>
          <Tab eventKey="viewMySimulations" title="View My Simulations">
            This tab is for listing user's simulations
          </Tab>
        </Tabs>
      </div>
    )
  }
}
