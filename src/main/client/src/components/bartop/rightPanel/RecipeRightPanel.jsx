import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';

export default class RecipeRightPanel extends Component {
	constructor() {
		super();
		this.state = {
			name: ""
		};
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.hadValidGlass = this.hadValidGlass.bind(this);
		this.constructMessage = this.constructMessage.bind(this);
	}
	submit() {
		var callback = this.props.onSubmitCallback;
		callback(this.state.name);
	}

	handleChange(e) {
		this.setState({ name: e.target.value });
	}
	hadValidGlass() {
		if (this.props.globalState.selected_slot != null && this.props.globalState.selected_slot.bar == "quick") {

			if (this.props.globalState.selected_slot.data != null && this.props.globalState.selected_slot.data.glass != null && this.props.globalState.selected_slot.data.actionStack.length > 0) {

				return true;
			}
		}
		return false;
	}
	constructMessage() {

		if (this.props.globalState.selected_slot != null && this.props.globalState.selected_slot.bar == "quick") {

			if (this.props.globalState.selected_slot.data != null && this.props.globalState.selected_slot.data.glass != null && this.props.globalState.selected_slot.data.actionStack.length > 0) {

				return "Press submit to submit this glass"
			}
			return "The glass must not be empty"
		}
		return "You must select a drink to submit as this recipe"
	}
	render() {
		return (

			<Tabs defaultActiveKey={"Submit"}>
				<Tab key={"Submit"} eventKey={"Submit"} title={"Submit"}>

					<div>
						<div>"Your Recipe Will Be"</div>
						{this.hadValidGlass() ? this.props.globalState.selected_slot.data.actionStack.map((item) => { return item.name }) : "None"}
					</div>
					{this.constructMessage()}
					<form>
						{/* Enter A Name For This Recipe:    <input type="text" name="name" /> */}
						<div className="FormField">
							<input type="text" id="name_field" className="FormField__Input" placeholder="Enter The Recipe Name" name="name_field" value={this.state.name} onChange={this.handleChange} />
						</div>
						<Button onClick={this.submit} bsstyle="primary">Submit Recipe</Button>
					</form>
				</Tab>
				<Tab key={"Data"} eventKey={"data"} title={"Data"}>


				</Tab>
			</Tabs>

		);
	}
}
