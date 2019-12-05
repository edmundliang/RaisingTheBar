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
					Recipe Panel
				</Tab>
			</Tabs>

		);
	}
}
