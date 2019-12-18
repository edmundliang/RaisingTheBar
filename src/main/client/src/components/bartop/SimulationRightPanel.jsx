import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './SimulationRightPanel.scss';
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class SimulationRightPanel extends Component {
	constructor() {
		super();
		this.state = {
			name: ""
                       
		};
		this.submitRecipe = this.submitRecipe.bind(this);
                this.submitSimulation = this.submitSimulation.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	submitRecipe() {
            this.props.onSubmitRecipeCallback();
	}
       
        
        submitSimulation() {
            this.props.onSubmitSimulationCallback();
        }

	handleChange(e) {
		this.setState({ name: e.target.value });
	}
	render() {
		return (

			<Tabs defaultActiveKey={"Tasks"}>
				<Tab key={"Tasks"} eventKey={"Tasks"} title={"Tasks"}>
					<div id="submit-title" className="MuiButton-root MuiButton-text block1 ">Required Recipes</div>
					<div className="log-box-simulation">
						{this.props.recipeQueue.map((recipe) => { return <p>{recipe.name}</p> })}
					</div>


					<div id="submit-title" className="MuiButton-root MuiButton-text block1 ">Completed Recipes
						<p id="completed-recipes"><span id="center"><i className="material-icons">arrow_forward_ios</i></span> {this.props.completedRecipes.length}</p></div>
					{/*{this.props.completedRecipes.map((recipe) => { return <p>{recipe.name}</p> })}*/}

					<div className="text-center container-fluid d-flex justify-content-between" id="checkbox">
						<Button id="button" onClick={this.submitRecipe} size="large" variant="contained" color="default" disableElevation >Submit Recipe</Button>
						<Button id="button" onClick={this.submitSimulation} size="large" variant="contained" color="secondary" disableElevation >Submit Simulation</Button>
					</div>

					<div className="block"></div>
					<div id="submit-title" className="MuiButton-root MuiButton-text">Helpful Tips</div>
					<div className="log-box-simulation">
						{this.props.simulationLog.length == 0 ? <p>Helpful Tips Will Appear Here</p> : this.props.simulationLog.map((item, index) => {
							return <p key={this.props.simulationLog[this.props.simulationLog.length - index] + index}>{this.props.simulationLog[this.props.simulationLog.length - index]}</p>
						})}
					</div>
				</Tab>
			</Tabs>

		);
	}
}
