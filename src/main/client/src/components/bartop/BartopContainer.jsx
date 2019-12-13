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
      } else if (x["category"] === "glasses") {
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
      recipeQueue: [],
      completedRecipes: [],
      recipeName: "",
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
    this.addRecipeToQueue = this.addRecipeToQueue.bind(this);
    this.submitGlassCallback = this.submitGlassCallback.bind(this);

    if (this.props.match.params.var1 === "recipe") {
      if (this.props.match.params.var2 === "edit" && this.props.match.params.var3 != null) {
        var data = new FormData();
        data.append('id', this.props.match.params.var3);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/recipe/get', true);
        xhr.onload = function (e) {
          // do something to response
          let recipeJson = JSON.parse(e.target.response);
          console.log(JSON.parse(e.target.response));
          this.setState({
            name: recipeJson.name, quickBar: [
              {
                glass: recipeJson.glass,
                actionStack: recipeJson.actionStack
              },
              {
                glass: null,
                actionStack: []
              },
              {
                glass: null,
                actionStack: []
              }
            ]
          });
        };
        xhr.send(data);
      }
    } else if (this.props.match.params.var1 === "simulation") {
      if (this.props.match.params.var2 != null) {
        var data = new FormData();
        data.append('id', this.props.match.params.var3);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/simulation/get', true);
        xhr.onload = function (e) {
          // do something to response
          let simulationJson = JSON.parse(e.target.response);
          for (var i = 0; i < simulationJson.recipes.length; i++) {
            var data = new FormData();
            data.append('id', simulationJson.recipes[i]);
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/recipe/get', true);
            xhr.onload = function (e) {
              this.addRecipeToQueue(JSON.parse(e.target.response))
            };
            xhr.send(data);
          }
          // console.log(JSON.parse(e.target.response));
          // this.setState({
          //   name: recipeJson.name, quickBar: [
          //     {
          //       glass: recipeJson.glass,
          //       actionStack: recipeJson.actionStack
          //     },
          //     {
          //       glass: null,
          //       actionStack: []
          //     },
          //     {
          //       glass: null,
          //       actionStack: []
          //     }
          //   ]
          // });
        };
        xhr.send(data);
      }
    }
  }
  submitGlassCallback() {

  }
  addRecipeToQueue(recipe) {
    let tempRecipeQueue = this.state.recipeQueue;
    tempRecipeQueue.push(recipe);
    this.setState({ recipeQueue: tempRecipeQueue })
  }
  onActionEndCallback(index) {
    if (index === 0) {
      let actionStack = this.state.actionBar[index].actionStack;
      if (actionStack[actionStack.length - 1] != "shake") {
        actionStack.push("shake");
        this.setState({ actionBar: [{ actionStack: actionStack }, this.state.actionBar[1], this.state.actionBar[2]] });
      }
    }
  }
  addSelectedIngredientToSelectedSlotCallback(amount) {
    // console.log(this.state.selected_slot)
    // console.log(this.state.selected_ingredient)
    if (this.state.selected_ingredient != null && this.state.selected_slot != null) {
      if ((this.state.selected_slot.bar === "quick" && this.state.selected_slot.data.glass != null) || (this.state.selected_slot.bar === "action")) {
        let data = this.state.selected_slot.data;
        let stack = data.actionStack;
        //console.log(this.state.selected_slot)
        
        let ingredient = Object.assign({}, this.state.selected_ingredient)
        //console.log(ingredient)
        if (amount > 0) {
            if (data.actionStack.length > 0 && data.actionStack[data.actionStack.length - 1].name == this.state.selected_ingredient.name && data.actionStack[data.actionStack.length - 1].amount != null) {
                ingredient.amount = (0.025 * amount) + data.actionStack[data.actionStack.length - 1].amount;
                data.actionStack.pop();
            } else {
                ingredient.amount = (0.025 * amount);
            }
        } else {
            if (data.actionStack.length > 0 && data.actionStack[data.actionStack.length - 1].name == this.state.selected_ingredient.name && data.actionStack[data.actionStack.length - 1].amount != null) {
                ingredient.amount = 1 + data.actionStack[data.actionStack.length-1].amount;
                data.actionStack.pop();
            } else {
            ingredient.amount = 1;
            }
        }
        
        
        if((data.amount == null)) {
            data.amount = 0;
        }
        
        console.log(data.amount)
        console.log(ingredient.amount)
        console.log(data)
        
      ///  if((data.amount + (0.025 * amount)) < data.glass.volume) {
            data.actionStack.push(ingredient);
            //let totalAmount = 0;
            //for(var i = 0; i < stack.length; i++) {
               // totalAmount = totalAmount + stack[i].amount;
            
           // }
            //data.amount = totalAmount;
           // console.log(data)
            //console.log(data.amount)
            this.setState({ selected_slot: { bar: this.state.selected_slot.bar, slot: this.state.selected_slot.slot, data: data } });
       // }
        
       
        
       
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

        // console.log("selected slot data glass not null")
        // console.log(this.state.selected_slot.data.actionStack.length)
        // console.log(this.state.selected_slot.data.actionStack)
        // console.log(this.state.selected_slot.data)
        if (this.state.selected_slot.data.actionStack.length >= 1) {
          // console.log("selected slot action stack greather than 1 or equal");

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
          var data = new FormData();
          data.append('name', name);
          data.append('json', JSON.stringify(outputJson));
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/recipe/add', true);
          xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
          };
          xhr.send(data);
          this.setState({ recipeName: name });
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
        <img className="top-img" draggable="false" src={"/images/glasses/" + (glass.name).toLowerCase() + ".png"} alt={"Missing Image: " + glass.name} />
        <span className="tooltiptext" >
          {
            actionStack.length == 0 ? "Empty" : actionStack.map((item, index) => {
              if (item instanceof Object) {
                return (<p key={item.name + index}>{item.name} {item.amount}</p>);
              } else {
                return (<p key={item + index}>{item} {item.amount}</p>);
              }
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
      this.state.actionBar[index].actionStack != null && this.state.actionBar[index].actionStack.length == 0 ? "Empty" : this.state.actionBar[index].actionStack.map((item, index) => {
        if (item instanceof Object) {
          return (<p key={item.name + index}>{item.name} {item.amount}</p>);
        } else {
          return (<p key={item + index}>{item} {item.amount}</p>);
        }
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
                <SelectedIngredient addSelectedIngredientToSelectedSlotCallback={this.addSelectedIngredientToSelectedSlotCallback} renderGlass={this.renderGlass} renderActionBarItem={this.renderActionBarItem} selected_ingredient={this.state.selected_ingredient} selected_slot={this.state.selected_slot} parent={this} onDragEndSelectedIngredientCallback={this.onDragEndActionBarCallback} />

              </div>
              <div id="bottom">
                <QuickBar renderGlass={this.renderGlass} selected_slot={this.state.selected_slot} onSelectedSlotChangeCallback={this.onSelectedSlotChangeCallback} dragged={this.state.dragged} onDragStartCallback={this.onDragStartCallback} onDragEndQuickBarCallback={this.onDragEndQuickBarCallback} inventory={this.state.quickBar} />
                <ActionBar onActionEndCallback={this.onActionEndCallback} renderActionBarItem={this.renderActionBarItem} selected_slot={this.state.selected_slot} onSelectedSlotChangeCallback={this.onSelectedSlotChangeCallback} dragged={this.state.dragged} onDragStartCallback={this.onDragStartCallback} onDragEndActionBarCallback={this.onDragEndActionBarCallback} inventory={this.state.actionBar} />
              </div>
              {/* <Controls selected={this.state.selected} parent={this} action_stack={this.state.action_stack} /> */}
            </div>
            <div id="sidebar-right">
              <Router>
                <Switch>
                  <Route path="*/recipe" render={() => <RecipeRightPanel recipeName={this.recipeName} onSubmitCallback={this.submitRecipeCallback} globalState={this.state} />} />
                  <Route path="*/simulation" render={() => <SimulationRightPanel completedRecipes={this.state.completedRecipes} recipeQueue={this.state.recipeQueue} onSubmitCallback={this.submitGlassCallback} />} />
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
