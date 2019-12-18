import React, { Component } from 'react';
import './ViewMySimulationsSimulationCard.scss';

export default class ViewMySimulationsSimulationCard extends Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onAddClick() {
    if (this.props.addSimulationCallabck != null)
      this.props.addSimulationCallabck(this.props.simulation);
  }
  onDeleteClick() {
    if (this.props.onDeleteCallback != null)
      this.props.onDeleteCallback(this.props.simulation.id);
  }
  render() {
    let { id, name, description, creator } = this.props.simulation;
    return (
      <div className="card text-center container-fluid d-flex justify-content-center">
        <div className="card-body text-dark">
          <h4 className="card-title">{name}</h4>
          <p className="card-text text-secondary">{description}</p>
          <div className="card-bottom container-fluid d-flex justify-content-around">
            <a href={"/bartop/simulation/" + id} onClick={this.onAddClick} className="mdl-button mdl-js-button mdl-button--raised">Add</a>
            {(this.props.user != null && this.props.user.id === creator) ? <a onClick={this.onDeleteClick} className="mdl-button mdl-js-button mdl-button--raised">Delete</a> : ""}
          </div>
        </div>
      </div>
    );
  }
}