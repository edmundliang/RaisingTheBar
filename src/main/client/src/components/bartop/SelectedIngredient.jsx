import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import "./SelectedIngredient.scss";
 
export default class SelectedIngredient extends Component {
    constructor(props) {
        super(props);
        this.getIngredientImage = this.getIngredientImage.bind(this);
        this.getSlotImage = this.getSlotImage.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
		this.pour = this.pour.bind(this);
		this.pouring = this.pouring.bind(this);
        this.state = {
            rotate: false,
			amount: 0,
			beingPoured: false,
        }
 
		this.t = undefined;
    }
    handleDrop(index, event) {
        // this.props.onDragEndSelectedIngredientCallback();
        // callback(index);
    }
    rotateFunction() {
        this.setState({ rotate: true });
 
    }
	onMouseDown() {
	  if (this.state.amount == null) {
		this.setState({amount : 0})
	  }
	  this.pouring();
	}
	onMouseUp() {
	   clearTimeout(this.t);
	   if (this.state.amount > 0) {
		   this.props.addSelectedIngredientToSelectedSlotCallback(this.state.amount)
	   }
	   this.setState({amount: 0});
	   
	 }
	pour() {
	  this.setState({ amount: this.state.amount + 1 });
  
	}
	pouring() {
	  this.pour();
	  this.t = setTimeout(this.pouring, 100);
	}
    getIngredientImage() {
        if (this.props.selected_ingredient != null) {
            //if (!this.state.rotate ){
            return <div onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}> <img className="top-img"  draggable="false" src={"/images/" + (this.props.selected_ingredient.category == "glasses" ? "glasses/" : "ingredients/") + this.props.selected_ingredient.name + ".png"} alt={"Missing Image: " + this.props.selected_ingredient.name} /> </div>
            // }
            /*else {
            return <div> <img  className="rotImg" onClick={this.rotateFunction.bind(this)} draggable="false" src={"/images/" + (this.props.selected_ingredient.category == "glasses" ? "glasses/" : "ingredients/") + this.props.selected_ingredient.name + ".png"} alt={"Missing Image: " + this.props.selected_ingredient.name} /> </div>
 
            }*/
            {/* <span className="tooltiptext" >
                    {this.props.inventory[index].actionStack.map((item) => {
                        return (<p key={item.name}>{item.name}</p>);
                    })}
                </span> */}
 
        } else {
            return <div id="tooltip" onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" />
                <span className="tooltiptext">There's nothing in this space!</span>
            </div>
        }
    }
    getSlotImage() {
 
        if (this.props.selected_bar != null) {
            if (this.props.selected_bar.bar == "quick") {
                var glass = this.props.selected_bar.data.glass;
                var actionBar = this.props.selected_bar.data.actionStack;
                return this.props.renderGlass(glass, actionBar);
            } else if (this.props.selected_bar.bar == "action") {
                var slot = this.props.selected_bar.slot
                return this.props.renderActionBarItem(slot)
            }
 
        } else {
            return <div id="tooltip">
                <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" />
                <span className="tooltiptext">There's nothing in this space!</span>
            </div>
        }
    }
    render() {
        return (
      

            <div className="selected_ingredient">
            <p> {this.state.amount}</p>
                <div onDrop={this.handleDrop.bind(this, 0)} onDragOver={(e) => e.preventDefault()} draggable>
                    {
                        this.getIngredientImage()
                    }
                </div>
                <div className="selected-slot" onDrop={this.handleDrop.bind(this, 1)} onDragOver={(e) => e.preventDefault()} draggable>
                    {
                        this.getSlotImage()
                    }
                </div>
            </div>
        );
    }
 
}