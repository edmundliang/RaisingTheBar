import React, { Component } from 'react';
import './RecipeCard.scss';
import Button from "@material-ui/core/Button";

export default class RecipeCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card text-center col" id="card">
        <div className="card-body text-dark" id="card-body">
          <h4 className="card-title" id="card-title">{this.props.recipe.name}</h4>
          <p className="card-recipes text-secondary" id="card-recipes">{this.props.recipe.description}</p>
          <div className="card-bottom container-fluid d-flex justify-content-around" id="card-bottom">
            <Button variant="contained">Add</Button>
          </div>
        </div>
      </div>
    );
  }
}