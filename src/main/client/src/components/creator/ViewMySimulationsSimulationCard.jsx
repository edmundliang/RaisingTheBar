import React, { Component } from 'react';
import './ViewMySimulationsSimulationCard.scss';

export default class ViewMySimulationsSimulationCard extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    this.props.onDeleteCallback(this.props.simulation.id);
  }
  render() {
    let { id, name, description } = this.props.simulation;
    return (
      <div className="card text-center container-fluid d-flex justify-content-center">
        <div className="card-body text-dark">
          <h4 className="card-title">{name}</h4>
          <p className="card-text text-secondary">{description}</p>
          <div className="card-bottom container-fluid d-flex justify-content-around">
            <a href={"/bartop/simulation/" + id} className="mdl-button mdl-js-button mdl-button--raised">Start</a>
            <a onClick={this.onDeleteClick} className="mdl-button mdl-js-button mdl-button--raised">Delete</a>
          </div>
        </div>
      </div>
    );
  }
}