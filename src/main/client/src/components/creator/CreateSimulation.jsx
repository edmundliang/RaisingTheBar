import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import RecipeCard from "./RecipeCard";
import CreateSimulationRecipeTable from "./CreateSimulationRecipeTable";
import CreateSimulationInputForm from "./CreateSimulationInputForm";
import './CreateSimulation.scss';

export default class CreateSimulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRecipes: []
        };

        if (props.simulation != null) {
            for (var x of props.simulation.recipes) {
                // console.log(x)
                var formData = new FormData();
                formData.append("id", x);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/recipe/get');
                var globalThis = this;
                xhr.onload = function () {
                    if (this.status === 200) {
                        try {
                            // console.log(this.responseText)
                            // console.log(JSON.parse(this.responseText));
                            var existingSims = globalThis.state.selectedRecipes;
                            existingSims.push(JSON.parse(this.responseText));
                            globalThis.setState({ selectedRecipes: existingSims });
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        console.log("Got status code " + this.status)
                    }
                };
                xhr.send(formData);
            }
        }
        // this.state.recipes = [
        //     {
        //         "id": "5df5b1de30778238e06d6b2e",
        //         "name": "Whisky Tonic",
        //         "description": "A classic drink for a classic person",
        //         "isPublic": true,
        //         "date": 1576382942151,
        //         "creator": "5df0fcd730778234fc4656fd",
        //         "json": "{\"name\":\"Whisky Tonic\",\"description\":\"A classic drink for a classic person\",\"public\":true,\"actionStack\":[{\"name\":\"WHISKY\",\"amount\":100},{\"name\":\"TONIC WATER\",\"amount\":103}],\"glass\":{\"name\":\"ROCKS\",\"category\":\"glasses\",\"volume\":1200}}"
        //     }
        // ];
        this.addRecipeToSimulation = this.addRecipeToSimulation.bind(this);
        this.createSimulation = this.createSimulation.bind(this);
    }
    addRecipeToSimulation(data) {
        let selectedList = this.state.selectedRecipes;
        for (var x of selectedList) {
            if (x.id === data.id) {
                return;
            }
        }
        selectedList.push(data);
        this.setState({ selectedRecipes: selectedList });
        // console.log(data);
    }
    createSimulation(data) {
        // console.log(data);    
        var globalThis = this;
        if (data.name <= 0 || data.name > 50) {
            return;
        }
        if (data.description <= 0 || data.description > 500) {
            return;
        }
        if (this.state.selectedRecipes.length <= 0) {
            return;
        }
        if (this.props.simulation != null) {
            var formData = new FormData();
            formData.append("id", this.props.simulation.id);
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("public", data.public);
            formData.append("practice", data.practice);
            let recipeIds = [];
            for (var i = 0; i < this.state.selectedRecipes.length; i++) {
                recipeIds.push(this.state.selectedRecipes[i].id);
            }
            formData.append("recipes", recipeIds);
            formData.append("json", JSON.stringify({
                name: data.name,
                description: data.description,
                public: data.public,
                practice: data.practice,
                recipes: recipeIds
            }));
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/simulation/edit');
            xhr.onload = function () {
                // console.log(this);
                if (this.status == 200) {
                    var simulation = JSON.parse(this.responseText);
                    globalThis.props.history.push("/bartop/simulation/" + simulation.id);
                    window.location.reload(true);
                }
            };
            xhr.send(formData);
        } else {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("public", data.public);
            formData.append("practice", data.practice);
            let recipeIds = [];
            for (var i = 0; i < this.state.selectedRecipes.length; i++) {
                recipeIds.push(this.state.selectedRecipes[i].id);
            }
            formData.append("recipes", recipeIds);
            formData.append("json", JSON.stringify({
                name: data.name,
                description: data.description,
                public: data.public,
                practice: data.practice,
                recipes: recipeIds
            }));
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/simulation/add');
            xhr.onload = function () {
                // console.log(this);
                if (this.status == 200) {
                    var simulation = JSON.parse(this.responseText);
                    globalThis.props.history.push("/bartop/simulation/" + simulation.id);
                    window.location.reload(true);
                }
            };
            xhr.send(formData);
        }
    }
    render() {
        let recipeCards = this.props.recipes.map((recipe, index) => {
            return (<div className="col" ><RecipeCard user={this.props.user} onDeleteCallback={this.props.deleteRecipeCallback} key={recipe.name + index} recipe={recipe} addRecipeToSimulation={this.addRecipeToSimulation} /> </div>)
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
                                    <CreateSimulationRecipeTable user={this.props.user} selected={this.state.selectedRecipes} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CreateSimulationInputForm name={this.props.simulation != null ? this.props.simulation.name : ""}
                                        description={this.props.simulation != null ? this.props.simulation.description : ""}
                                        public={this.props.simulation != null ? this.props.simulation.public : ""}
                                        practice={this.props.simulation != null ? this.props.simulation.practice : ""}
                                        createSimulation={this.createSimulation} />
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