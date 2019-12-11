import React, { Component } from 'react';
import './EditSimulationSimulationCard.scss';
import Button from "@material-ui/core/Button";

export default class EditSimulationSimulationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, recipes, description, type } = this.props.simulation;
    return (
      <div className="edit-card text-center container-fluid d-flex justify-content-center">
        <div className="edit-card-body text-dark">
          <h4 className="edit-card-title">{title}</h4>
          <p className="edit-card-recipes text-secondary">{recipes}</p>
          <p className="edit-card-text text-secondary">{description}</p>
          <p className="edit-card-text text-secondary font-italic">{type}</p>
          <div className="edit-card-bottom container-fluid d-flex justify-content-around">
            <Button variant="contained" color="secondary">Delete</Button>
            <Button variant="contained">Select</Button>
          </div>
        </div>
      </div>
    );
  }
}