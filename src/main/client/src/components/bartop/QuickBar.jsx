import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import "./QuickBar.scss";

export default class QuickBar extends Component {
	constructor(props) {
		super(props);
		this.getImage = this.getImage.bind(this);
	}
	handleDrop(index, event) {
		var callback = this.props.onDragEndQuickBarCallback;
		callback(index);
		event.preventDefault()
	}
        handleDragStart(item, e) {
		var callback = this.props.onDragStartCallback;
		callback(item);
	}
	getImage(index) {
		if (this.props.inventory[index].glass != null) {
			return <div id="tooltip">
				<img className="top-img" draggable="false" src={"/images/" + (this.props.inventory[index].glass.category == "glasses" ? "glasses/" : "ingredients/") + this.props.inventory[index].glass.name + ".png"} alt={"Missing Image: " + this.props.inventory[index].glass.name} />
				<span className="tooltiptext" >
					{this.props.inventory[index].actionStack.map((item)=>{
					return  (<p key={item.name}>{item.name}</p>);
					})}
				</span>
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
			<div className="quick-bar">
				<div className="quickbar-item" onDrop={this.handleDrop.bind(this, 0)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						this.getImage(0)
					}
				</div>
				<div className="quickbar-item" onDrop={this.handleDrop.bind(this, 1)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						this.getImage(1)
					}
				</div>
				<div className="quickbar-item" onDrop={this.handleDrop.bind(this, 2)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						this.getImage(2)
					}
				</div>
			</div>
		);
	}
}
