import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Label, Button } from 'react-bootstrap';
import './CenterFold.scss';

export default class CenterFold extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 1,
			action_stack: this.props.action_stack,
			redo_action_stack: []
		};
		this.undo = this.undo.bind(this);
		this.redo = this.redo.bind(this);
		this.cancel = this.cancel.bind(this);
		this.shake = this.shake.bind(this);
		this.addToGlass = this.addToGlass.bind(this);
		this.changeAmount = this.changeAmount.bind(this);
		this.increaseAmount = this.changeAmount.bind(this, 1);
		this.decreaseAmount = this.changeAmount.bind(this, -1);
		this.increaseAmountHalf = this.changeAmount.bind(this, 1 / 2);
		this.decreaseAmountHalf = this.changeAmount.bind(this, -1 / 2);
		this.increaseAmountQuarter = this.changeAmount.bind(this, 1 / 4);
		this.decreaseAmountQuarter = this.changeAmount.bind(this, -1 / 4);
	}
	undo() {
		if (this.state.action_stack.length > 0) {
			let removed = this.state.action_stack.pop()
			this.state.redo_action_stack.push(removed)
			this.setState({ action_stack: this.state.action_stack })
		}
	}
	redo() {
		if (this.state.redo_action_stack.length > 0) {
			let removed = this.state.redo_action_stack.pop()
			this.state.action_stack.push(removed)
			this.setState({ action_stack: this.state.action_stack })
		}
	}
	cancel() {
		if (this.state.action_stack.length > 0) {
			this.state.action_stack.push(["shake", 1])
			this.setState({ action_stack: this.state.action_stack })
		}
	}
	shake() {
		if (this.state.action_stack.length > 0) {
			this.state.action_stack.push(["shake", 1])
			this.setState({ action_stack: this.state.action_stack })
		}
	}
	addToGlass() {
		if (this.props.selected != null) {
			this.state.action_stack.push([this.props.selected, this.state.amount])
			this.setState({ action_stack: this.state.action_stack, redo_action_stack: [] });
		}
	}
	changeAmount(delta, event) {
		this.setState({ amount: this.state.amount + delta });
	}
	render() {
		// console.log(this.props)
		let selected = this.props.selected;
		let action_stack = this.state.action_stack;
		console.log(this.state.action_stack);
		return (
			<div className="flex-container">
				<div id="glass-display">
					<ul>
						{
							action_stack.length === 0 ? "Glass Is Empty" : action_stack.map((item) => (
								<li className="flex-container">
									{item[0] !== "shake" ? item[0]["name"] + " " + item[1] + " Oz" : "Shake"}
								</li>
							))
						}
					</ul>
				</div>
				<div id="option-display">
					<Button onClick={this.undo} bsstyle="primary">Undo</Button>
					<Button onClick={this.redo} bsstyle="primary">Redo</Button>
					<Button onClick={this.cancel} bsstyle="primary">Cancel</Button>
					<Button onClick={this.shake} bsstyle="primary">Shake</Button>
				</div>
				<div id="selected-display">
					<div>Your current selection is: {selected != null ? selected["name"] : "None"}</div>

					<span>{this.state.amount} Oz</span>
					<br />
					<Button onClick={this.decreaseAmount} bsstyle="primary">-1 Oz</Button>
					<Button onClick={this.increaseAmount} bsstyle="primary">+1 Oz</Button>
					<br />
					<Button onClick={this.decreaseAmountHalf} bsstyle="primary">-1/2 Oz</Button>
					<Button onClick={this.increaseAmountHalf} bsstyle="primary">+1/2 Oz</Button>
					<br />
					<Button onClick={this.decreaseAmountQuarter} bsstyle="primary">-1/4 Oz</Button>
					<Button onClick={this.increaseAmountQuarter} bsstyle="primary">+1/4 Oz</Button>
					<br />
					<Button onClick={this.addToGlass} bsstyle="primary">Pour</Button>
				</div>
			</div>
			// <div>
			// 	<ul>
			// 		<li>
			// 			<div>Show the glasses here</div>
			// 		</li>
			// 		<li>
			// 			<div>Show undo/redo share and submit here </div>
			// 		</li>
			// 		<li>
			// 			<div>
			// 				<Button onClick={this.decreaseAmount} bsstyle="primary">Less</Button>
			// 				<Button onClick={this.increaseAmount} bsstyle="primary">More</Button>
			// 				<select value={this.state.scale} onChange={this.handleScaleChange}>
			// 					<option value="1">1 Oz</option>
			// 					<option value=".5">1/2 Oz</option>
			// 					<option value=".25">1/4 Oz</option>
			// 				</select>
			// 				<Button onClick={this.handleSubmit} bsstyle="primary">Pour</Button>
			// 				<input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
			// 			</div>
			// 		</li>
			// 	</ul>
			// </div>
		);
	}
}
