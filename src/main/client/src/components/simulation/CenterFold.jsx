import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Label, Button } from 'react-bootstrap';
import './CenterFold.scss';

export default class CenterFold extends Component {
	constructor(props) {
		super(props);
		this.state = { amount: 1 };
		this.undo = this.undo.bind(this);
		this.redo = this.redo.bind(this);
		this.cancel = this.cancel.bind(this);
		this.shake = this.shake.bind(this);
		this.submit = this.submit.bind(this);
		this.changeAmount = this.changeAmount.bind(this);
		this.increaseAmount = this.changeAmount.bind(this, 1);
		this.decreaseAmount = this.changeAmount.bind(this, -1);
		this.increaseAmountHalf = this.changeAmount.bind(this, 1 / 2);
		this.decreaseAmountHalf = this.changeAmount.bind(this, -1 / 2);
		this.increaseAmountQuarter = this.changeAmount.bind(this, 1 / 4);
		this.decreaseAmountQuarter = this.changeAmount.bind(this, -1 / 4);
	}
	undo() {

	}
	redo() {

	}
	cancel() {

	}
	shake() {

	}
	submit() {

	}
	changeAmount(delta, event) {
		this.setState({ amount: this.state.amount + delta });
	}
	render() {
		return (
			<div className="flex-container">
				<div id="glass-display">Show the glasses here</div>
				<div id="option-display">
					<Button onClick={this.undo} bsstyle="primary">Undo</Button>
					<Button onClick={this.redo} bsstyle="primary">Redo</Button>
					<Button onClick={this.cancel} bsstyle="primary">Cancel</Button>
					<Button onClick={this.shake} bsstyle="primary">Shake</Button>
					<Button onClick={this.submit} bsstyle="primary">Submit</Button>
				</div>
				<div id="selected-display">
					<div>Currently selected glass</div>

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
					<Button onClick={this.submit} bsstyle="primary">Pour</Button>
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
