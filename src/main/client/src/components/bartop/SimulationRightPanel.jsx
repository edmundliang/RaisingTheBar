import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import './SimulationRightPanel.scss';

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
					<div>
						<div>Required Recipes</div>
						{this.props.recipeQueue.map((recipe) => { return <p>{recipe.name}</p> })}
					</div>
					<div>
						<div>Completed Recipes</div>
                                                
                                                
					{/*	{this.props.completedRecipes.map((recipe) => { return <p>{recipe.name}</p> })} */}
                                                        
					</div>
					
					<div>
						<form>
							<Button onClick={this.submitRecipe} bsstyle="primary">Submit Recipe</Button>
                                                       
						</form>
						<div>
							{/* Put error here */}
						</div>
					</div>
                                        <div>
						<form>
							<Button onClick={this.submitSimulation} bsstyle="primary">Submit Simulation</Button>
                                                 
						</form>
						<div>
							{/* Put error here */}
						</div>
					</div>
                                        
                                        <div>Log:</div>
						<div className="scroll">
							{this.props.simulationLog.length == 0 ? "Helpful Tips Will Appear Here" : this.props.simulationLog.map((item, index) => {
								return <p key={this.props.simulationLog[this.props.simulationLog.length - index] + index}>{this.props.simulationLog[this.props.simulationLog.length - index]}</p>
							})}
						</div>
				</Tab>
			</Tabs>

		);
	}
}
