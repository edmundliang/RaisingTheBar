import React, { Component } from 'react';
import './Simulation.scss';
import { Button } from 'react-bootstrap';

export default class SelectedItem extends Component {
	constructor(props) {
		super(props);
		this.state = { amount: "0" };
		this.state = { amount: "0" };
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleScaleChange = this.handleScaleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	decreaseAmount() {

	}
	increaseAmount() {

		// this.setState({ amount: this.state.amount + this.state.scale *  });
	}
	handleAmountChange(event) {
		console.log(event)
		if (parseFloat(event.target.value)) {
			this.setState({ amount: event.target.value });
		}
		event.persist()
	}
	handleScaleChange(event) {
		this.setState({ scale: parseFloat(event.target.value) });
	}
	handleSubmit() {

	}
	render() {
		return (
			<div>
				<Button onClick={this.decreaseAmount} bsstyle="primary">Less</Button>
				<Button onClick={this.increaseAmount} bsstyle="primary">More</Button>
				<select value={this.state.scale} onChange={this.handleScaleChange}>
					<option value="1">1 Oz</option>
					<option value=".5">1/2 Oz</option>
					<option value=".25">1/4 Oz</option>
				</select>
				<Button onClick={this.handleSubmit} bsstyle="primary">Pour</Button>
				<input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
			</div>
		);
	}
}
