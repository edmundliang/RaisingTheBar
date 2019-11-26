import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
// import { Container, Row, Col } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";
import CenterFold from "./CenterFold";
import RightPanel from "./RightPanel";

import './Simulation.scss';

import simulationTestJson from './simulation_test.json';

export default class SimulationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      action_stack: []
    };
    this.onSelectedChangeCallback = this.onSelectedChangeCallback.bind(this);
    this.onSubmitCallback = this.onSubmitCallback.bind(this);
  }
  onSelectedChangeCallback(selectedIngredient) {
    this.setState({ selected: selectedIngredient });
  }
  onCupContentsChange(action_stack) {

  }
  onSubmitCallback(name) {
    //Name is the name of hte recipe that the user wants to submit
    //Where you should add your 
    console.log(this.state.action_stack);
  }
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <div>

          <div id="wrapper" className="center">

            <div id="sidebar-left">
              <IngredientsTable ingredients={simulationTestJson.ingredients} onSelectedChangeCallback={this.onSelectedChangeCallback} />
            </div>
            <div id="main">
              <CenterFold selected={this.state.selected} parent ={this} action_stack = {this.state.action_stack} />
            </div>
            <div id="sidebar-right">
              <RightPanel onSubmitCallback={this.onSubmitCallback} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
