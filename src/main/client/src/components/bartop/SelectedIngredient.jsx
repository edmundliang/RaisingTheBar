import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import "./SelectedIngredient.scss";

export default class SelectedIngredient extends Component {
	constructor(props) {
		super(props);
		this.getIngredientImage = this.getIngredientImage.bind(this);
		this.getSlotImage = this.getSlotImage.bind(this);
	}
	handleDrop(index, event) {
		var callback = this.props.onDragEndQuickBarCallback;
		callback(index);
		event.preventDefault()
	}
	getIngredientImage() {
		if (this.props.selected_ingredient != null) {
			return <div >
				<img className="top-img" draggable="false" src={"/images/" + (this.props.selected_ingredient.category == "glasses" ? "glasses/" : "ingredients/") + this.props.selected_ingredient.name + ".png"} alt={"Missing Image: " + this.props.selected_ingredient.name} />
				{/* <span className="tooltiptext" >
					{this.props.inventory[index].actionStack.map((item) => {
						return (<p key={item.name}>{item.name}</p>);
					})}
				</span> */}
			</div>

		} else {
			return <div id="tooltip">
				<img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" />
				<span className="tooltiptext">There's nothing in this space!</span>
			</div>
		}
	}
	getSlotImage() {

		if (this.props.selected_bar != null && this.props.selected_bar.bar != null) {
			if (this.props.selected_bar.bar == "quick") {
				var intredient = this.props.selected_bar.slot.data
				return <div >
					<img className="top-img" draggable="false" src={"/images/" + (intredient.category == "glasses" ? "glasses/" : "ingredients/") + intredient.name + ".png"} alt={"Missing Image: " + intredient.name} />
					{/* <span className="tooltiptext" >
					{this.props.inventory[index].actionStack.map((item) => {
						return (<p key={item.name}>{item.name}</p>);
					})}
				</span> */}
				</div>
			} else if (this.props.selected_bar.bar == "action") {

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
