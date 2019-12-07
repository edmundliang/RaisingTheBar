import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import "./QuickBar.scss";

export default class QuickBar extends Component {
	constructor(props) {
		super(props);
	}
	handleDrop(index, event) {
		var callback = this.props.onDragEndQuickBarCallback;
		callback(index);
		event.preventDefault()
	}
	render() {
		return (
			<div id="quick-bar">
				<div onDrop={this.handleDrop.bind(this, 0)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						(() => {
							if (this.props.inventory[0].ingredient != null) {
                                                            return (<div id="tooltip"> <img className="top-img" src={"/images/ingredients/" + this.props.inventory[0].ingredient.name + ".png"} alt="empty spot" /> <span class="tooltiptext" > {this.props.inventory[0].ingredient.name} </span> </div>)
							} else {

                    return (<div id="tooltip"> <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" /> <span class="tooltiptext">There's nothing in this space!</span> </div>)
							}
						}).call()
					}
				</div>
				<div onDrop={this.handleDrop.bind(this, 1)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						(() => {
							if (this.props.inventory[1].ingredient != null) {
								return (<div id="tooltip"> <img className="top-img" src={"/images/ingredients/" + this.props.inventory[0].ingredient.name + ".png"} alt="empty spot" /> <span class="tooltiptext" > {this.props.inventory[0].ingredient.name} </span> </div>)
							} else {

								return (<div id="tooltip"> <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" /> <span class="tooltiptext">There's nothing in this space!</span> </div>)
							}
						}).call()
					}
				</div>
				<div onDrop={this.handleDrop.bind(this, 2)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						(() => {
							if (this.props.inventory[2].ingredient != null) {
								return (<div id="tooltip"> <img className="top-img" src={"/images/ingredients/" + this.props.inventory[0].ingredient.name + ".png"} alt="empty spot" /> <span class="tooltiptext" > {this.props.inventory[0].ingredient.name} </span> </div>)
							} else {

								return (<div id="tooltip"> <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" /> <span class="tooltiptext">There's nothing in this space!</span> </div>)
							}
						}).call()
					}
				</div>
			</div>
		);
	}
}
