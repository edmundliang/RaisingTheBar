import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
// import { Container, Row, Col } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";
import Controls from "./Controls";
import QuickBar from "./QuickBar";
import SelectedIngredient from "./SelectedIngredient";
import ActionBar from "./ActionBar";
import RecipeRightPanel from "./rightPanel/RecipeRightPanel.jsx";
import SimulationRightPanel from "./rightPanel/SimulationRightPanel.jsx";
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
      } else if (x["category"] === "glasses" || x["category"] === "ice") {
        glasses.push(x)
      } else {
        otherIngredients.push(x);
      }
    }
    this.state = {
      selected_ingredient: null,
      selected_slot: null,
      otherIngredients: otherIngredients,
      glasses: glasses,
      alcohol: alcohol,
      dragged: null,
      quickBar: [{
        glass: null,
        actionStack: []
      },
      {
        glass: null,
        actionStack: []
      },
      {
        glass: null,
        actionStack: []
      }],
      actionBar: [{
        //Shaker
        actionStack: []
      },
      {
        //Pan
        actionStack: []
      },
      {
        //Knife
        actionStack: []
      }]
    };
    this.onActionEndCallback = this.onActionEndCallback.bind(this);
    this.addSelectedIngredientToSelectedSlotCallback = this.addSelectedIngredientToSelectedSlotCallback.bind(this);
    this.onSelectedIngredientChangeCallback = this.onSelectedIngredientChangeCallback.bind(this);
    this.onSelectedSlotChangeCallback = this.onSelectedSlotChangeCallback.bind(this);
    this.onDragStartCallback = this.onDragStartCallback.bind(this);
    this.onDragEndActionBarCallback = this.onDragEndActionBarCallback.bind(this);
    this.onDragEndQuickBarCallback = this.onDragEndQuickBarCallback.bind(this);
    this.submitRecipeCallback = this.submitRecipeCallback.bind(this);
    this.renderGlass = this.renderGlass.bind(this);
    this.renderActionBarItem = this.renderActionBarItem.bind(this);
    // var xhr = new XMLHttpRequest();
    // xhr.addEventListener("load", function (e) {
    //   this.setState({ ingredientsJson: JSON.parse(e.target.response).ingredients });
    //   // console.log(JSON.parse(e.target.response)["ingredients"])
    // }.bind(this))
    // xhr.open("GET", '/ingredients/list');
    // xhr.send();
  }
  onActionEndCallback(index) {
    if (index === 0) {
      let actionStack = this.state.actionBar[index].actionStack;
      actionStack.push("shake");
      let actionBar = [];
      for (var i = 0; i < 3; i++) {

        if (i != index) {
          actionBar.push(this.state.actionBar[index]);
        } else {
          actionBar.push(actionStack);
        }
      }
      this.setState({ actionBar: actionBar });
    }
  }
  addSelectedIngredientToSelectedSlotCallback(amount) {
    // console.log(this.state.selected_slot)
    // console.log(this.state.selected_ingredient)
    if (this.state.selected_ingredient != null && this.state.selected_slot != null) {
      if ((this.state.selected_slot.bar === "quick" && this.state.selected_slot.data.glass != null)||(this.state.selected_slot.bar === "action")) {

        let data = this.state.selected_slot.data;
        let ingredient = Object.assign({}, this.state.selected_ingredient)
        ingredient.amount = amount
        data.actionStack.push(ingredient);
        this.setState({ selected_slot: { bar: this.state.selected_slot.bar, slot: this.state.selected_slot.slot, data: data } });
      }
    }
  }
  onSelectedIngredientChangeCallback(selectedIngredient) {
    this.setState({ selected_ingredient: selectedIngredient });
  }
  onSelectedSlotChangeCallback(bar, slot, data) {
    this.setState({ selected_slot: { bar: bar, slot: slot, data: data } });
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
    if (this.state.dragged.category == null) { //means is an actionbar item or quickbar item
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
  onDragEndSelectedIngredientCallback(index) {
    var submissionSlot = this.state.submissionSlot
    submissionSlot[index].ingredient = this.state.dragged;
    this.setState({ submissionSlot: submissionSlot, dragged: null });
  }
  onDragEndSubmissionSlotCallback(index) {
    var submissionSlot = this.state.submissionSlot
    submissionSlot[index].ingredient = this.state.dragged;
    this.setState({ submissionSlot: submissionSlot, dragged: null });
  }
  onDragEndQuickBarCallback(index) {
    if (this.state.dragged != null) {
      var quickBar = this.state.quickBar;
      if (this.state.dragged.category === "glasses") { //if glass reset action stack
        quickBar[index].glass = this.state.dragged;
        quickBar[index].actionStack = [];
        this.setState({ quickBar: quickBar, dragged: null });
      } else if (quickBar[index].glass != null && quickBar[index].glass.category === "glasses" &&
        this.state.dragged.category != null) {//if glass in there and if item being dragged is an ingredient
        quickBar[index].actionStack.push(this.state.dragged);
        this.setState({ quickBar: quickBar, dragged: null });
      }
      else if (quickBar[index].glass != null && quickBar[index].glass.category === "glasses") { //for quickbar to quickbar and actionbar to quickbar
        for (var element of this.state.dragged.actionStack) {
          quickBar[index].actionStack.push(element);
        }
        this.setState({ quickBar: quickBar, dragged: null });
      }
    } else {
      this.setState({ dragged: null });
    }
    // console.log(this.state.quickBar)
  }
  onDragEndSelectedIngredientCallback(index) {

  }
  submitRecipeCallback(name) {

    if (this.state.selected_slot != null && this.state.selected_slot.bar == "quick") {

      if (this.state.selected_slot.data.glass != null) {
        if (this.state.selected_slot.data.actionStack.length > 1) {
          //Name is the name of the recipe that the user wants to submit
          //Where you should add your
          let prunedActionStack = []
          for (var i = 0; i < this.state.selected_slot.data.actionStack.length; i++) {
            let current = this.state.selected_slot.data.actionStack[i];
            if (current instanceof Object) {

              let newObject = {
                name: current.name,
                amount: current.amount
              }
              prunedActionStack.push(newObject)
            } else if (current === "shake") {
              prunedActionStack.push(current);
            }
          }
          let outputJson = {
            name: name,
            actionStack: prunedActionStack,
            glass: {
              name: this.state.selected_slot.data.glass.name
            }
          }
          console.log(outputJson)
          // var data = new FormData();
          // data.append('json', JSON.stringify(outputJson));
          // var xhr = new XMLHttpRequest();
          // xhr.open('POST', '/recipe/add', true);
          // xhr.onload = function () {
          //   // do something to response
          //   console.log(this.responseText);
          // };
          // xhr.send(data);
        } else {

          console.log("You must have something in the glass");
        }

      } else {
        console.log("Must have a glass");
      }
    } else {
      console.log("A quick bar item must be selected");
    }
  }

  renderGlass(glass, actionStack) {
    if (glass != null) {
      return <div id="tooltip">
        <img className="top-img" draggable="false" src={"/images/glasses/" + glass.name + ".png"} alt={"Missing Image: " + glass.name} />
        <span className="tooltiptext" >
          {
            actionStack.length == 0 ? "Empty" : actionStack.map((item, index) => {
              return (<p key={item.name + index}>{item.name} {item.amount}</p>);
            })
          }
        </span>
      </div>
    } else {
      return <div id="tooltip">
        <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" />
        <span className="tooltiptext">There's nothing in this space!</span>
      </div>
    }
  }
  returnStats() {
    if (this.state.selected_ingredient != null) {
      return <p> {this.state.selected_ingredient.name}, {this.state.selected_amount}</p>
    }
  }
  renderActionBarItem(index) {

    var image = null;

    if (index == 0) {
      image = "/images/actions/shaker.png";
    } else if (index == 1) {
      image = "/images/actions/pan.png";
    }
    else if (index == 2) {
      image = "/images/actions/knife.png";
    }

    return (<div id="tooltip"><img src={image} alt={"actionBar index " + index + " not found"} /><span className="tooltiptext">{
      this.state.actionBar[index].actionStack.length == 0 ? "Empty" : this.state.actionBar[index].actionStack.map((item, index) => {
        return (<p key={item.name + index}>{item.name} {item.amount}</p>);
      })
    }</span></div>)

  }
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <div>
          <div id="wrapper" className="center">
            <div id="sidebar-left">
              <div id="top">
                <IngredientsTable ingredients={this.state.otherIngredients} onSelectedIngredientChangeCallback={this.onSelectedIngredientChangeCallback} selected={this.state.selected_ingredient} scrolling="vert" />
              </div>

              <div id="bottom">
                <IngredientsTable ingredients={this.state.glasses} selected={this.state.selected_ingredient} scrolling="vert" onDragStartCallback={this.onDragStartCallback} />
              </div>
            </div>
            <div id="main">
              <div id="top">

                {this.returnStats()}
                <SelectedIngredient addSelectedIngredientToSelectedSlotCallback={this.addSelectedIngredientToSelectedSlotCallback} renderGlass={this.renderGlass} renderActionBarItem={this.renderActionBarItem} selected_ingredient={this.state.selected_ingredient} selected_bar={this.state.selected_slot} parent={this} onDragEndSelectedIngredientCallback={this.onDragEndActionBarCallback} />
                <div id="right">
                  <ActionBar onActionEndCallback={this.onActionEndCallback} renderActionBarItem={this.renderActionBarItem} selected_slot={this.state.selected_slot} onSelectedSlotChangeCallback={this.onSelectedSlotChangeCallback} dragged={this.state.dragged} onDragStartCallback={this.onDragStartCallback} onDragEndActionBarCallback={this.onDragEndActionBarCallback} inventory={this.state.actionBar} />
                </div>
              </div>
              <div id="bottom">
                <QuickBar renderGlass={this.renderGlass} selected_slot={this.state.selected_slot} onSelectedSlotChangeCallback={this.onSelectedSlotChangeCallback} dragged={this.state.dragged} onDragStartCallback={this.onDragStartCallback} onDragEndQuickBarCallback={this.onDragEndQuickBarCallback} inventory={this.state.quickBar} />
              </div>
              {/* <Controls selected={this.state.selected} parent={this} action_stack={this.state.action_stack} /> */}
            </div>
            <div id="sidebar-right">
              <Router>
                <Switch>
                  <Route path="*/recipe" render={() => <RecipeRightPanel onSubmitCallback={this.submitRecipeCallback} globalState={this.state} />} />
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
