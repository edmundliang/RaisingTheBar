import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "./ActionBar.scss";

export default class QuickBar extends Component {
	constructor(props) {
		super(props);
	}

	handleDrop(index, event) {
		var callback = this.props.onDragEndActionBarCallback;
		callback(index);
		event.preventDefault()
	}
        handleDragStart(item, e) {
		var callback = this.props.onDragStartCallback;
                var output = {
                    data: item.actionStack,
                    type: "action"
                }
                
		callback(item);
	}
	render() {
     
		return (
			<div className="action-bar">
				<div className = "action-item" onDragStart={this.handleDragStart.bind(this, this.props.inventory[0])} onDrop={this.handleDrop.bind(this, 0)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						(() => {
							if (this.props.inventory[0].ingredient != null) {

                                                                return (<img className="top-img" src="/images/actions/shaker.png" alt="empty spot" />)
                                                                
							} else {

								return (<img className="bottom-img" src="/images/actions/shaker.png" alt="shaker" />)
							}
						}).call()
					}
				</div>
				<div className = "action-item" onDragStart={this.handleDragStart.bind(this, this.props.inventory[0])} onDrop={this.handleDrop.bind(this, 1)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						(() => {
							if (this.props.inventory[1].ingredient != null) {
								return (<img className="top-img" src="/images/actions/pan.png" alt="empty spot" />)
							} else {

								return (<img className="bottom-img" src="/images/actions/pan.png" alt="pan" />)
							}
						}).call()
					}
				</div>
				<div className = "action-item" onDragStart={this.handleDragStart.bind(this, this.props.inventory[0])} onDrop={this.handleDrop.bind(this, 2)} onDragOver={(e) => e.preventDefault()} draggable>
					{
						(() => {
							if (this.props.inventory[2].ingredient != null) {
								return (<img className="top-img" src="/images/actions/knife.png" alt="empty spot" />)
							} else {

								return (<img className="bottom-img" src="/images/actions/knife.png" alt="knife" />)
							}
						}).call()
					}
				</div>
			</div>
		);
	}
}
