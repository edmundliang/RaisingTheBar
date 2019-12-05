import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import './SimulationContainer.scss';

export default class SimulationRightPanel extends Component {
	constructor() {
		super();
		this.state = {
			name: ""
		};
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	submit() {
		var callback = this.props.onSubmitCallback;
		callback(this.state.name);
	}

	handleChange(e) {
		this.setState({ name: e.target.value });
	}
	render() {
		return (

			<Tabs defaultActiveKey={"Data"}>
				<Tab key={"Data"} eventKey={"Data"} title={"Data"}>
					<div>
						<form>
							{/* Enter A Name For This Recipe:    <input type="text" name="name" /> */}
							<div className="FormField">
								<input type="text" id="name_field" className="FormField__Input" placeholder="Enter The Recipe Name" name="name_field" value={this.state.name} onChange={this.handleChange} />
							</div>
							<Button onClick={this.submit} bsstyle="primary">Submit Recipe</Button>
						</form>
						<div>
							{/* Put error here */}
						</div>
					</div>
				</Tab>
			</Tabs>

		);
	}
}
