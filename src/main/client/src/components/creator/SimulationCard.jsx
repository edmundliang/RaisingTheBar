import React, { Component } from 'react';
import './SimulationCard.scss';

export default class SimulationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, recipes, description, type, link } = this.props.simulation;
    return (
      <div className="card text-center container-fluid d-flex justify-content-center">
        <div className="card-body text-dark">
          <h4 className="card-title">{title}</h4>
          <p className="card-recipes text-secondary">{recipes}</p>
          <p className="card-text text-secondary">{description}</p>
          <div className="card-bottom container-fluid d-flex justify-content-around">
            <p className="card-text text-secondary font-italic">{type}</p>
            <a href={link} className="mdl-button mdl-js-button mdl-button--raised">Link</a>
          </div>
        </div>
      </div>
    );
  }
}