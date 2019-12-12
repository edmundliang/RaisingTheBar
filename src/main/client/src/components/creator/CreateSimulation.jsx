import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import RecipeCard from "./RecipeCard";
import CreateSimulationRecipeTable from "./CreateSimulationRecipeTable";
import CreateSimulationInputForm from "./CreateSimulationInputForm";
import './CreateSimulation.scss';

export default class CreateSimulation extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };
       var globalThis = this;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/recipe/list', true);
          xhr.onload = function () {
            // do something to response
            console.log(JSON.parse(this.responseText));
            globalThis.setState({recipes: JSON.parse(this.responseText).recipes});
          };
     xhr.send();
    }
    /*updateRecipeData(e) {
        this.setState({ recipes: JSON.parse(e.target.response).recipes });
        console.log(this.state.recipes)

    }*/
    /*getSimulations() {
        var data = new FormData();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/recipe/list', true);
            xhr.onload = function () {
              // do something to response
              th.stateSet({recipes: JSON.parse(this.responseText)});
            };
            xhr.send(data);
    }*/
    render() {
        let recipeCards = this.state.recipes.map(recipe => {
            return (<div className="col" ><RecipeCard key={recipe.recipeName} recipe={recipe} /> </div>)
        });

        return (<div className="mt-4 text-center container-fluid d-flex justify-content-center" >
            <Row className="custom-row" >
                <Col xs={12} md={8} >
                    <Jumbotron fluid className="jumbo p-0" >
                        <div className="left-container" >
                            <Col className="mt-2" >
                                <div className="row p-1" >
                                    {recipeCards}
                                </div>
                            </Col >
                        </div>
                    </Jumbotron >
                </Col>
                <Col xs={6} md={4} >
                    <Jumbotron fluid className="jumbo p-0" >
                        <div className="right-container" >
                            <Row>
                                <Col>
                                    <CreateSimulationRecipeTable />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CreateSimulationInputForm />
                                </Col>
                            </Row >
                        </div>
                    </Jumbotron >
                </Col>
            </Row >
        </div>
        );
    }
}