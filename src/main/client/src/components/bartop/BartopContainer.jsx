import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
// import { Container, Row, Col } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";
import Controls from "./Controls";
import QuickBar from "./QuickBar";
import ActionBar from "./ActionBar";
import RecipeRightPanel from "./RecipeRightPanel.jsx";
import SimulationRightPanel from "./SimulationRightPanel.jsx";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoMatch from '../NoMatch';

import './BartopContainer.scss';
import ingredientsJsonFile from "../../assets/ingredients.json"

export default class SimulationContainer extends Component {
  constructor(props) {
    super(props);
    var otherIngredients = [];
    var glasses = [];
    var alcohol = [];
    for (var x of ingredientsJsonFile.ingredients) {
      if (x["category"] === null) {
        x["category"] = "other";
        otherIngredients.push(x);
      } else if (x["category"] === "glasses") {
        glasses.push(x)
      } else if (x["category"] === "liquors" || x["category"] === "wine") {
        alcohol.push(x)
      } else {
        otherIngredients.push(x);
      }
    }
    this.state = {
      selected: null,
      otherIngredients: otherIngredients,
      glasses: glasses,
      alcohol: alcohol,
      dragged: null,
      submissionSlot: null,
      quickBar: [{
        glass: null,
        actionStack: null
      },
      {
        glass: null,
        actionStack: null
      },
      {
        glass: null,
        actionStack: null
      }],
      actionBar: [{
        ingredient: null
      },
      {
        ingredient: null
      },
      {
        ingredient: null
      }]

    };
    this.onSelectedChangeCallback = this.onSelectedChangeCallback.bind(this);
    this.onDragStartCallback = this.onDragStartCallback.bind(this);
    this.onDragEndActionBarCallback = this.onDragEndActionBarCallback.bind(this);
    this.onDragEndQuickBarCallback = this.onDragEndQuickBarCallback.bind(this);
    this.submitRecipeCallback = this.submitRecipeCallback.bind(this);
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
  onDragStartCallback(dragged) {
    this.setState({ dragged: dragged });
  }
  onDragEndActionBarCallback(index) {
    var actionBar = this.state.actionBar
    if (actionBar[index].actionStack == null) {
        actionBar[index].actionStack = [];
    }
    var element;
    if (this.state.dragged.category == null ){ //means is an actionbar item or quickbar item
        for (element of this.state.dragged.actionStack) {
            actionBar[index].actionStack.push(element);
        }
    }
    else {
        actionBar[index].ingredient = this.state.dragged;
        actionBar[index].actionStack.push(this.state.dragged);
    }
    
    
    this.setState({ actionBar: actionBar, dragged: null });
  }
  onDragEndSubmissionSlotCallback(index) {
    var submissionSlot = this.state.submissionSlot
    submissionSlot[index].ingredient = this.state.dragged;
    this.setState({ submissionSlot: submissionSlot, dragged: null });
  }
  onDragEndQuickBarCallback(index) {
    if (this.state.dragged != null) {
      var quickBar = this.state.quickBar;
      if (this.state.dragged.category === "glasses") {
        quickBar[index].glass = this.state.dragged;
        quickBar[index].actionStack = [];
        this.setState({ quickBar: quickBar, dragged: null });
      } else if (quickBar[index].glass != null && quickBar[index].glass.category === "glasses") {
        quickBar[index].actionStack.push(this.state.dragged);
        this.setState({ quickBar: quickBar, dragged: null });
      }
    } else {
      this.setState({ dragged: null });
    }
    // console.log(this.state.quickBar)
  }
  submitRecipeCallback(name) {

    //Name is the name of the recipe that the user wants to submit
    //Where you should add your
    var ingredients = [];
    var volumes = [];
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
              <IngredientsTable ingredients={this.state.otherIngredients} onSelectedChangeCallback={this.onSelectedChangeCallback} selected={this.state.selected} scrolling="vert" onDragStartCallback={this.onDragStartCallback} />
              <IngredientsTable ingredients={this.state.glasses} onSelectedChangeCallback={this.onSelectedChangeCallback} selected={this.state.selected} scrolling="vert" onDragStartCallback={this.onDragStartCallback} />
            </div>
            <div id="main">
              
              <ActionBar selected={this.state.selected} parent={this} action_stack={this.state.action_stack} dragged={this.state.dragged} onDragEndActionBarCallback={this.onDragEndActionBarCallback} onDragStartCallback={this.onDragStartCallback} inventory={this.state.actionBar} />
              {/* <Controls selected={this.state.selected} parent={this} action_stack={this.state.action_stack} /> */}
              <QuickBar selected={this.state.selected} parent={this} action_stack={this.state.action_stack} dragged={this.state.dragged} onDragEndQuickBarCallback={this.onDragEndQuickBarCallback} onDragStartCallback={this.onDragStartCallback} inventory={this.state.quickBar} />
              
            
              <div id="alcoholPanel">
                <IngredientsTable ingredients={this.state.alcohol} onSelectedChangeCallback={this.onSelectedChangeCallback} selected={this.state.selected} container="liquor" scrolling="hori" onDragStartCallback={this.onDragStartCallback} />
              </div>
            </div>
            <div id="sidebar-right">
              <Router>
                <Switch>
                  <Route path="*/recipe" render={() => <RecipeRightPanel onSubmitCallback={this.submitRecipeCallback} />} />
                  <Route path="*/simulation" render={() => <SimulationRightPanel onSubmitCallback={this.submitRecipeCallback} />} />
                  <Route component={NoMatch} />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
