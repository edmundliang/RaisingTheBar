import React, { Component } from 'react'
import NavigationBar from "../navbar/NavigationBar";
// import { Container, Row, Col } from "react-bootstrap";
import IngredientsTable from "./IngredientsTable";
import Controls from "./Controls";
import QuickBar from "./QuickBar";
import SelectedIngredient from "./SelectedIngredient";
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
      } else {
        otherIngredients.push(x);
      }
    }
    this.state = {
      selectedIngredient: null,
      selectedSlot: null,
      otherIngredients: otherIngredients,
      glasses: glasses,
      alcohol: alcohol,
      dragged: null,
      messageLog: [],
      mode: {
        mode: null
      },
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
    this.addSelectedIngredientToSelectedSlotCallbackRemaining = this.addSelectedIngredientToSelectedSlotCallbackRemaining.bind(this);
    this.onSelectedIngredientChangeCallback = this.onSelectedIngredientChangeCallback.bind(this);
    this.onSelectedSlotChangeCallback = this.onSelectedSlotChangeCallback.bind(this);
    this.onDragStartCallback = this.onDragStartCallback.bind(this);
    this.onDragEndActionBarCallback = this.onDragEndActionBarCallback.bind(this);
    this.onDragEndQuickBarCallback = this.onDragEndQuickBarCallback.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.submitRecipeCallback = this.submitRecipeCallback.bind(this);
    this.renderGlass = this.renderGlass.bind(this);
    this.renderActionBarItem = this.renderActionBarItem.bind(this);
    this.addRecipeToQueue = this.addRecipeToQueue.bind(this);
    this.submitGlassCallback = this.submitGlassCallback.bind(this);
    var mode = {
      mode: this.props.match.params.var1,
      submode: this.props.match.params.var2,
      data: {}
    }
    if (this.props.match.params.var1 === "recipe") {

      if (this.props.match.params.var2 === "add") {
        mode.data = {
          name: "",
          description: ""
        }
      } else if (this.props.match.params.var2 === "edit" && this.props.match.params.var3 != null) {
        var data = new FormData();
        data.append('id', this.props.match.params.var3);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/recipe/get', true);
        // let local_this = this;
        xhr.onload = function (e) {
          // do something to response
          let recipeJson = JSON.parse(e.target.response);
          // console.log(JSON.parse(e.target.response));
          mode.data = {
            name: recipeJson.name,
            description: recipeJson.description
          }
          this.state.quickBar = [
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
          ];
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
    this.state.mode = mode;
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
    // console.log(this.state.selectedSlot)
    // console.log(this.state.selectedIngredient)
    if (this.state.selectedIngredient != null && this.state.selectedSlot != null) {
      if ((this.state.selectedSlot.bar === "quick" && this.state.selectedSlot.data.glass != null) || (this.state.selectedSlot.bar === "action")) {
        let data = this.state.selectedSlot.data;
        let stack = data.actionStack;
        //console.log(this.state.selectedSlot)

        let ingredient = Object.assign({}, this.state.selectedIngredient)
        //console.log(ingredient)
        if (amount > 0) {
          if (data.actionStack.length > 0 && data.actionStack[data.actionStack.length - 1].name == this.state.selectedIngredient.name && data.actionStack[data.actionStack.length - 1].amount != null) {
            ingredient.amount = (0.025 * amount) + data.actionStack[data.actionStack.length - 1].amount;
            data.actionStack.pop();
          } else {
            ingredient.amount = (0.025 * amount);
          }
        } else {
          if (data.actionStack.length > 0 && data.actionStack[data.actionStack.length - 1].name == this.state.selectedIngredient.name && data.actionStack[data.actionStack.length - 1].amount != null) {
            ingredient.amount = 1 + data.actionStack[data.actionStack.length - 1].amount;
            data.actionStack.pop();
          } else {
            ingredient.amount = 1;
          }
        }

        data.actionStack.push(ingredient);
        this.setState({ selectedSlot: { bar: this.state.selectedSlot.bar, slot: this.state.selectedSlot.slot, data: data } });

      }
    }
  }
  addSelectedIngredientToSelectedSlotCallbackRemaining(amount) {
    if (this.state.selectedIngredient != null && this.state.selectedSlot != null) {
      if ((this.state.selectedSlot.bar === "quick" && this.state.selectedSlot.data.glass != null) || (this.state.selectedSlot.bar === "action")) {
        let data = this.state.selectedSlot.data;
        let stack = data.actionStack;

        let ingredient = Object.assign({}, this.state.selectedIngredient)
        //console.log(ingredient)
        if (amount > 0) {
          if (data.actionStack.length > 0 && data.actionStack[data.actionStack.length - 1].name == this.state.selectedIngredient.name && data.actionStack[data.actionStack.length - 1].amount != null) {
            ingredient.amount = (amount) + data.actionStack[data.actionStack.length - 1].amount;
            data.actionStack.pop();
          } else {
            ingredient.amount = (amount);
          }
        }

        data.actionStack.push(ingredient);
        this.setState({ selectedSlot: { bar: this.state.selectedSlot.bar, slot: this.state.selectedSlot.slot, data: data } });


      }
    }
  }


  onSelectedIngredientChangeCallback(selectedIngredient) {
    this.setState({ selectedIngredient: selectedIngredient });
  }
  onSelectedSlotChangeCallback(bar, slot, data) {
    this.setState({ selectedSlot: { bar: bar, slot: slot, data: data } });
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
  sendMessage(message) {
    let messageLog = this.state.messageLog;
    messageLog.push(message);
    this.setState({ messageLog: messageLog });
  }
  submitRecipeCallback(data) {

    if (data.name.length <= 0) {
      this.sendMessage("Can't submit, you must input a name");
      return;
    }
    if (data.description.length <= 0) {
      this.sendMessage("Can't submit, you must input a description");
      return;
    }
    if (data.name.length > 50) {
      this.sendMessage("Can't submit, the recipe name cant be longer than 50 characters");
      return;
    }
    if (data.description.length > 500) {
      this.sendMessage("Can't submit, the recipe description cant be longer than 500 characters");
      return;
    }
    if (this.state.selectedSlot == null || this.state.selectedSlot.bar != "quick") {
      this.sendMessage("Can't submit, a quick bar item must be selected");
      return;
    }
    if (this.state.selectedSlot.data.glass == null) {
      this.sendMessage("Can't submit, you must select a glass");
      return;
    }
    if (this.state.selectedSlot.data.actionStack.length < 1) {
      this.sendMessage("Can't submit, the glass cannot be empty");
      return;
    }
    let prunedActionStack = []
    for (var i = 0; i < this.state.selectedSlot.data.actionStack.length; i++) {
      let current = this.state.selectedSlot.data.actionStack[i];
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
      name: data.name,
      actionStack: prunedActionStack,
      glass: {
        name: this.state.selectedSlot.data.glass.name
      }
    }
    console.log(outputJson)
    var data = new FormData();
    data.append('name', data.name);
    data.append('description', data.description);
    data.append('private', data.private);
    data.append('json', JSON.stringify(outputJson));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/recipe/add', true);
    xhr.onload = function () {
      // do something to response
      console.log(this.responseText);
    };
    console.log(data)
    xhr.send(data);
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
                <IngredientsTable ingredients={this.state.otherIngredients} onSelectedIngredientChangeCallback={this.onSelectedIngredientChangeCallback} selected={this.state.selectedIngredient} scrolling="vert" />
              </div>

              <div id="bottom">
                <IngredientsTable ingredients={this.state.glasses} selected={this.state.selectedIngredient} scrolling="vert" onDragStartCallback={this.onDragStartCallback} />
              </div>
            </div>
            <div id="main">
              <div id="top">
                <SelectedIngredient addSelectedIngredientToSelectedSlotCallback={this.addSelectedIngredientToSelectedSlotCallback} renderGlass={this.renderGlass} renderActionBarItem={this.renderActionBarItem} selectedIngredient={this.state.selectedIngredient} selectedSlot={this.state.selectedSlot} onDragEndSelectedIngredientCallback={this.onDragEndActionBarCallback} addSelectedIngredientToSelectedSlotCallbackRemaining={this.addSelectedIngredientToSelectedSlotCallbackRemaining} />
              </div>
              <div id="bottom">
                <QuickBar renderGlass={this.renderGlass} selectedSlot={this.state.selectedSlot} onSelectedSlotChangeCallback={this.onSelectedSlotChangeCallback} dragged={this.state.dragged} onDragStartCallback={this.onDragStartCallback} onDragEndQuickBarCallback={this.onDragEndQuickBarCallback} inventory={this.state.quickBar} />
                <ActionBar onActionEndCallback={this.onActionEndCallback} renderActionBarItem={this.renderActionBarItem} selectedSlot={this.state.selectedSlot} onSelectedSlotChangeCallback={this.onSelectedSlotChangeCallback} dragged={this.state.dragged} onDragStartCallback={this.onDragStartCallback} onDragEndActionBarCallback={this.onDragEndActionBarCallback} inventory={this.state.actionBar} />
              </div>
              {/* <Controls selected={this.state.selected} parent={this} action_stack={this.state.action_stack} /> */}
            </div>
            <div id="sidebar-right">
              <Router>
                <Switch>
                  <Route path="*/recipe" render={() => <RecipeRightPanel selectedSlot={this.state.selectedSlot} messageLog={this.state.messageLog} onSubmitCallback={this.submitRecipeCallback} mode={this.state.mode} />} />
                  <Route path="*/simulation" render={() => <SimulationRightPanel mode={this.state.mode} onSubmitCallback={this.submitGlassCallback} />} />
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
