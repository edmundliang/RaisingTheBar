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
		this.constructMessage = this.constructMessage.bind(this);
	}
	submit() {
		var callback = this.props.onSubmitCallback;
		callback(this.state.name);
	}

	handleChange(e) {
		this.setState({ name: e.target.value });
	}
	constructMessage() {

		if (this.props.globalState.selected_slot != null && this.props.globalState.selected_slot.bar == "quick") {

			if(this.props.globalState.selected_slot.data != null && this.props.globalState.selected_slot.data.glass != null && this.props.globalState.selected_slot.data.actionStack.length> 0) {

				return "Press submit to submit this glass"
			}
			return "The glass must not be empty"
		} 
		return "You must select a drink to submit as this recipe"
	}
	render() {
		return (

			<Tabs defaultActiveKey={"Data"}>
				<Tab key={"Data"} eventKey={"Data"} title={"Data"}>

					{this.constructMessage()}
				</Tab>
			</Tabs>

		);
	}
}
