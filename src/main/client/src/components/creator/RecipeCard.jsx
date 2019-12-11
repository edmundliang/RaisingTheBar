import React, { Component } from 'react';
import './RecipeCard.scss';

export default class RecipeCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { recipeName, ingredients, add } = this.props.recipe;
    return (
      <div className="card text-center col" id="card">
        <div className="card-body text-dark" id="card-body">
          <h4 className="card-title" id="card-title">{recipeName}</h4>
          <p className="card-recipes text-secondary" id="card-recipes">{ingredients}</p>
          <div className="card-bottom container-fluid d-flex justify-content-around" id="card-bottom">
            <button className="mdl-button mdl-js-button mdl-button--raised">{add}</button>
          </div>
        </div>
      </div>
    );
  }
}