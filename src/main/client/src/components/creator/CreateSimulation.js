import {Component} from "react";
import React from "react";
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import RecipeCard from "./RecipeCard";
import CreateSimulationRecipeTable from "./CreateSimulationRecipeTable";
import CreateSimulationInputForm from "./CreateSimulationInputForm";
import './CreateSimulation.scss';

export default class CreateSimulation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          recipeName: "Recipe title 1",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 2",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 3",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 4",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 5",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 6",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 7",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 8",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 9",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 10",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 11",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 12",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 13",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
        {
          recipeName: "Recipe title 14",
          ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
          add: "Add",
        },
      ]
    }
  }

  render() {
    let recipeCards = this.state.recipes.map(recipe => {
      return (
        <div className="col">
          <RecipeCard key={recipe.title} recipe={recipe} />
        </div>
      )
    });

    return (
      <div className="mt-4 text-center container-fluid d-flex justify-content-center">
        <Row className="custom-row">
          <Col xs={12} md={8}>
            <Jumbotron fluid className="jumbo p-0">
              <div className="left-container">
                <Col className="mt-2">
                  <div className="row p-1">
                    {recipeCards}
                  </div>
                </Col>
              </div>
            </Jumbotron>
          </Col>

          <Col xs={6} md={4}>
            <Jumbotron fluid className="jumbo p-0">
              <div className="right-container">
                <Row>
                  <Col>
                    <CreateSimulationRecipeTable/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CreateSimulationInputForm/>
                  </Col>
                </Row>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}