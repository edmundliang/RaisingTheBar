import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
// import { Container, Row, Col } from "react-bootstrap";
import IngredientsTable from "../bartop/IngredientsTable";
import Controls from "../bartop/Controls";
import QuickBar from "../bartop/QuickBar";
import ActionBar from "../bartop/ActionBar";
import SimulationRightPanel from "./RecipeRightPanel";

import './RecipeContainer.scss';
import ingredientsJsonFile from "../../assets/ingredients.json"

export default class RecipeContainer extends Component {
  constructor(props) {
    super(props);
    var otherIngredients = [];
    var glasses = [];
    var alcohol = [];
    for (var x of ingredientsJsonFile.ingredients) {
      if(x["category"] == null) {
        x["category"] = "other";
        otherIngredients.push(x);
      }else if(x["category"] == "glasses"){
        glasses.push(x)
      }else if(x["category"] == "liquors" || x["category"] == "wine"){
        alcohol.push(x)
      }else {        
        otherIngredients.push(x);
      }
    }
    this.state = {
      selected: null,
      action_stack: [],
      otherIngredients: otherIngredients,
      glasses: glasses,
      alcohol : alcohol
    };
    this.onSelectedChangeCallback = this.onSelectedChangeCallback.bind(this);
    this.onSubmitCallback = this.onSubmitCallback.bind(this);
    // var xhr = new XMLHttpRequest();
    // xhr.addEventListener("load", function (e) {
    //   this.setState({ ingredientsJson: JSON.parse(e.target.response).ingredients });
    //   // console.log(JSON.parse(e.target.response)["ingredients"])
    // }.bind(this))
    // xhr.open("GET", '/ingredients/list');
    // xhr.send();
  }
  onSelectedChangeCallback(selectedIngredient) {
    this.setState({ selected: selectedIngredient });
  }
  onCupContentsChange(action_stack) {

  }
  onSubmitCallback(name) {

    //Name is the name of the recipe that the user wants to submit
    //Where you should add your
    var ingredients = new Array();
    var volumes = new Array();
    for (var value of this.state.action_stack) {
      ingredients.push(value[0]["name"]);
      volumes.push(value[1]);
    }
    for (var i = 0; i < ingredients.length - 1; i++) {
      if (ingredients[i] === ingredients[i + 1]) {
        volumes[i] = volumes[i] + volumes[i + 1];
        ingredients.splice(i + 1, 1);
        volumes.splice(i + 1, 1);
      }

    }
    // console.log(ingredients);
    // console.log(volumes);

    var data = new FormData();
    data.append('name', name);
    data.append('glass', 'Shot Glass');
    data.append('ingredients', ingredients);
    data.append('volumes', volumes);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/recipe/add', true);
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
        <div>

          <div id="wrapper" className="center">

            <div id="sidebar-left">
              <IngredientsTable ingredients={this.state.otherIngredients} onSelectedChangeCallback={this.onSelectedChangeCallback} />
              <IngredientsTable ingredients={this.state.glasses} onSelectedChangeCallback={this.onSelectedChangeCallback} />
            </div>
            <div id="main">
              <ActionBar selected={this.state.selected} parent={this} action_stack={this.state.action_stack} />
              <Controls selected={this.state.selected} parent={this} action_stack={this.state.action_stack} />
              <QuickBar selected={this.state.selected} parent={this} action_stack={this.state.action_stack} />
              <div id = "alcoholPanel">
              <IngredientsTable ingredients={this.state.alcohol} onSelectedChangeCallback={this.onSelectedChangeCallback} />
              </div>
            </div>
            <div id="sidebar-right">
              <SimulationRightPanel onSubmitCallback={this.onSubmitCallback} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
