import React, { Component } from 'react';
import './ViewMySimulationsSimulationCard.scss';

export default class ViewMySimulationsSimulationCard extends Component {
	constructor(props) {
		super(props);
		this.onSelectClick = this.onSelectClick.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	onSelectClick() {
		if (this.props.addSimulationCallback != null) {
			this.props.addSimulationCallback(this.props.simulation);
		}
	}
	onDeleteClick() {
		if (this.props.onDeleteCallback != null) {
			this.props.onDeleteCallback(this.props.simulation.id);
		}
	}
	render() {
		let { id, name, description, creator } = this.props.simulation;
		return (
			<div className="card text-center container-fluid d-flex justify-content-center">
				<div className="card-body text-dark">
					<h4 className="card-title">{name}</h4>
					<p className="card-text text-secondary">{description}</p>
					<div className="card-bottom container-fluid d-flex justify-content-around">
						<a onClick={this.onSelectClick} className="mdl-button mdl-js-button mdl-button--raised">Results</a>
						<a href={"/bartop/simulation/" + id} className="mdl-button mdl-js-button mdl-button--raised">Go</a>
						{(this.props.user != null && this.props.user.id === creator) ? <a onClick={this.onDeleteClick} className="mdl-button mdl-js-button mdl-button--raised">Delete</a> : ""}
					</div>
				</div>
			</div>
		);
	}
}