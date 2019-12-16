import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import './RecipeRightPanel.scss';

export default class RecipeRightPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			public: true
		};
		if (props.mode.mode != "recipe") {
			console.log("RecipeRightPanel is being created on a non recipe page")
		}
		if (props.mode.mode == "edit" || props.mode.submode == "get") {
			this.state.name = props.mode.data.name;
			this.state.description = props.mode.data.description;
		}
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.hadValidGlass = this.hadValidGlass.bind(this);
	}
	submit() {
		this.props.onSubmitCallback({ name: this.state.name, description: this.state.description, public: this.state.public });
	}

	handleChange(e) {
		if (e.target.type === "checkbox") {
			this.setState({ [e.target.name]: e.target.checked });
		} else {
			if ((e.target.name == "name" && e.target.value.length <= 50)
				||
				(e.target.name == "description" && e.target.value.length <= 500)) {
				this.setState({ [e.target.name]: e.target.value });
			}
		}
	}
	hadValidGlass() {
		return this.props.selectedSlot != null && this.props.selectedSlot.bar == "quick" && this.props.selectedSlot.data != null && this.props.selectedSlot.data.glass != null && this.props.selectedSlot.data.actionStack.length > 0;
	}
	render() {
		return (
			<Tabs defaultActiveKey={"Submit"}>
				<Tab key={"Submit"} eventKey={"Submit"} title={"Submit"}>

					<div className="FormField">
						<div>
							Enter A Name For This Recipe:
						</div>
						<input type="text" id="name" className="FormField__Input" placeholder="Enter The Recipe Name" name="name" value={this.state.name} onChange={this.handleChange} />
						<div>
							Enter A Description For This Recipe:
						</div>
						<input type="text" id="description" className="FormField__Input" placeholder="Enter The Recipe Description" name="description" value={this.state.description} onChange={this.handleChange} />
						<div>
							Public Recipe?
						<input type="checkbox" id="public" name="public" checked={this.state.public} onChange={this.handleChange} />
						</div>
						<Button onClick={this.submit} bsstyle="primary">Submit Recipe</Button>
						<div>
							<div>Cup Contents</div>
							<div className="scroll">
								{this.hadValidGlass() ? this.props.selectedSlot.data.actionStack.map((item, index) => {

									if (item.scale === "ounces") {

										return <p key={item + index}>{item.name + " " + (item.amount / 100) + " oz"}</p>
									} else {

										return <p key={item + index}> {item === "shake" ? item : item.name + " " + item.amount + " ct"}</p>
									}

									if (item.scale === "ounces") {
										return <div key={item + index}> {item === "shake" ? <p>{item}</p> : <p>{item.name + " " + (item.amount / 100) + " oz"}</p>}</div>
									} else {
										return <div key={item + index}> {item === "shake" ? <p>{item}</p> : <p>{item.name + " " + (item.amount) + " ct"}</p>}</div>
									}
								}) : "None"}
							</div>
						</div>
						<div>Log:</div>
						<div className="scroll">
							{this.props.messageLog.length == 0 ? "Helpful Tips Will Appear Here" : this.props.messageLog.map((item, index) => {
								return <p key={this.props.messageLog[this.props.messageLog.length - index] + index}>{this.props.messageLog[this.props.messageLog.length - index]}</p>
							})}
						</div>
					</div>
				</Tab>
			</Tabs>
		);
	}
}
