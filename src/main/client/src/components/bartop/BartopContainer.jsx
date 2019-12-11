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
      selected_amount: null,
      beingPoured: false,
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
        //Shaker
        actionStack: null
      },
      {
        //Pan
        actionStack: null
      },
      {
        //Knife
        actionStack: null
      }]

    };
    this.t = undefined;
    this.start = 100;
    this.onSelectedIngredientChangeCallback = this.onSelectedIngredientChangeCallback.bind(this);
    this.onSelectedSlotChangeCallback = this.onSelectedSlotChangeCallback.bind(this);
    this.onDragStartCallback = this.onDragStartCallback.bind(this);
    this.onDragEndActionBarCallback = this.onDragEndActionBarCallback.bind(this);
    this.onDragEndQuickBarCallback = this.onDragEndQuickBarCallback.bind(this);
    this.submitRecipeCallback = this.submitRecipeCallback.bind(this);
    this.renderGlass = this.renderGlass.bind(this);
    this.renderActionBarItem = this.renderActionBarItem.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this)
    this.pour = this.pour.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.pouring = this.pouring.bind(this);
    // var xhr = new XMLHttpRequest();
    // xhr.addEventListener("load", function (e) {
    //   this.setState({ ingredientsJson: JSON.parse(e.target.response).ingredients });
    //   // console.log(JSON.parse(e.target.response)["ingredients"])
    // }.bind(this))
    // xhr.open("GET", '/ingredients/list');
    // xhr.send();
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
        var element;
        for (element of this.state.dragged.actionStack) {
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
  
  onMouseDown() {
      if (this.state.selected_amount == null) {
          this.state.selected_amount =  0;
      }
      console.log("pls");
      this.pouring();
  }
  onMouseUp() {
     clearTimeout(this.t);
     this.start = 100;
     if (this.state.selected_slot != null) {
         this.state.selected_ingredient.amount = this.state.selected_amount;
         this.state.selected_slot.data.actionStack.push(Object.assign({},this.state.selected_ingredient));
     }
     this.setState({selected_amount: 0});
     
   }
  pour() {
      this.setState({selected_amount: this.state.selected_amount + .25 });
          
  }
  pouring() {
      this.pour();
      this.t = setTimeout(this.pouring, this.start);
      this.start = this.start / 2;
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

  renderGlass(glass, actionStack) {
    if (glass != null) {
      return <div id="tooltip">
        <img className="top-img" draggable="false" src={"/images/glasses/" + glass.name + ".png"} alt={"Missing Image: " + glass.name} />
        <span className="tooltiptext" >
          {
            actionStack.length == 0 ? "Empty" : actionStack.map((item, index) => {
              return (<p key={item.name + index}>{item.name}</p>);
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
  renderActionBarItem(index) {

    if (index == 0) {
      if (this.state.actionBar[0].ingredient != null) {

        return (<img className="top-img" src="/images/actions/shaker.png" alt="empty spot" />)

      } else {

        return (<img className="bottom-img" src="/images/actions/shaker.png" alt="shaker" />)
      }
    } else if (index == 1) {
      if (this.state.actionBar[1].ingredient != null) {
        return (<img className="top-img" src="/images/actions/pan.png" alt="empty spot" />)
      } else {

        return (<img className="bottom-img" src="/images/actions/pan.png" alt="pan" />)
      }
    }
    else if (index == 2) {
      if (this.state.actionBar[2].ingredient != null) {
        return (<img className="top-img" src="/images/actions/knife.png" alt="empty spot" />)
      } else {

        return (<img className="bottom-img" src="/images/actions/knife.png" alt="knife" />)
      }
    }

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
                <SelectedIngredient renderGlass={this.renderGlass} renderActionBarItem={this.renderActionBarItem} selected_ingredient={this.state.selected_ingredient} selected_bar={this.state.selected_slot} parent={this} onDragEndSelectedIngredientCallback={this.onDragEndActionBarCallback} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}  />
                <div id="right">
                  <ActionBar renderActionBarItem={this.renderActionBarItem} selected_slot={this.state.selected_slot} onSelectedSlotChangeCallback={this.onSelectedSlotChangeCallback} dragged={this.state.dragged} onDragStartCallback={this.onDragStartCallback} onDragEndActionBarCallback={this.onDragEndActionBarCallback} inventory={this.state.actionBar} />
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
                  <Route path="*/recipe" render={() => <RecipeRightPanel onSubmitCallback={this.submitRecipeCallback} globalState ={this.state} />} />
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
