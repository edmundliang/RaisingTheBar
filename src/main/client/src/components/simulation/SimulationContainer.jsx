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
    var ingredients = new Array();
    var volumes = new Array();
    for (var value of this.state.action_stack ) {
        ingredients.push(value[0]);
        volumes.push(value[1]);
    }
    for (var i = 0; i < ingredients.length - 1; i++) {
        if (ingredients[i] === ingredients[i+1]) {
            volumes[i] = volumes[i] + volumes[i+1];
            ingredients.splice(i+1,1);
            volumes.splice(i+1,1);
        }
        
    }
    console.log(ingredients);
    console.log(volumes);
    
    var data = new FormData();
    data.append('name', name);
    data.append('glass', 'Shot Glass');
    data.append('ingredients', ingredients);
    data.append('volumes', volumes);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'recipe/add', true);
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
    };
    xhr.send(data);
      }
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
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
      </React.Fragment>
    )
  }
}
