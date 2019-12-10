import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import "./SelectedIngredient.scss";

export default class SelectedIngredient extends Component {
	constructor(props) {
		super(props);
		this.getImage = this.getImage.bind(this);
	}
	handleDrop(index, event) {
		var callback = this.props.onDragEndQuickBarCallback;
		callback(index);
		event.preventDefault()
	}
	getImage() {
		if (this.props.selected != null) {
			return <div >
				<img className="top-img" draggable="false" src={"/images/" + (this.props.selected.category == "glasses" ? "glasses/" : "ingredients/") + this.props.selected.name + ".png"} alt={"Missing Image: " + this.props.selected.name} />
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
	render() {
		return (
			<div className="selected-ingredient">
				<div onDrop={this.handleDrop.bind(this)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						this.getImage()
					}
				</div>
			</div>
		);
	}
}
