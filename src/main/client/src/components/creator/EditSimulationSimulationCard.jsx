import React, { Component } from 'react';
import './EditSimulationSimulationCard.scss';
import Button from "@material-ui/core/Button";

export default class EditSimulationSimulationCard extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.selectSimulationCallback(this.props.simulation);
  }
  render() {
    let { name, description, type } = this.props.simulation;
    return (
      <div className="edit-card text-center container-fluid d-flex justify-content-center">
        <div className="edit-card-body text-dark">
          <h4 className="edit-card-title">{name}</h4>
          <p className="edit-card-text text-secondary">{description}</p>
          <p className="edit-card-text text-secondary font-italic">{type}</p>
          <div onClick={this.onClick} className="edit-card-bottom container-fluid d-flex justify-content-around">
            <Button variant="contained">Select</Button>
          </div>
        </div>
      </div>
    );
  }
}