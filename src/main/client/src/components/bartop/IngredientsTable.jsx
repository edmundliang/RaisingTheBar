import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './IngredientsTable.scss';

export default class IngredientsTabs extends Component {
	constructor(props) {
		super(props);
	}
	onIngredientClick(item, event) {
		if (item !== this.props.selected) {
			var callback = this.props.onSelectedChangeCallback;
			callback(item)
		}
	} 
	handleDragStart(item, e) {		
		var callback = this.props.onDragStartCallback;
		callback(item);
	}
	render() {
		var gloablThis = this;
		let categoryList = [];
		let ingredientsList = new Map();
		if (this.props.ingredients != null) {
			for (var x of this.props.ingredients) {
				if (ingredientsList.get(x["category"]) == null) {
					ingredientsList.set(x["category"], []);
				}
				ingredientsList.get(x["category"]).push(x);
			}
			ingredientsList.forEach((value, key, map) => { categoryList.push(key) })
		}
		return (
			<div>
				<div className={this.props.container === "liquor" ? "liquors-container" : "ingredients-container"}>
					<Tabs defaultActiveKey={categoryList[0]}>
						{
							categoryList.map((item) => (
								<Tab key={item} eventKey={item} title={item}>
									<div className={this.props.scrolling === "vert" ? "vert-table " : "hori-table"}>
										{(() => {
											var output = [];
											var elements = ingredientsList.get(item)
											for (var x of elements) {
												let boundFunctionCall = this.onIngredientClick.bind(this, x);
												output.push(
													<div draggable onDragStart={this.handleDragStart.bind(gloablThis, x)} className={this.props.selected === x ? "list_element selected" : "list_element"} key={x["name"]} onClick={boundFunctionCall}>
														<img draggable="false" src={"images/ingredients/" + x["name"] + ".png"} />
														<p>{x["name"]}</p>
													</div>
												);
											}
											return output;
										}).call()
										}
									</div>
								</Tab>
							))}
					</Tabs>
				</div>
			</div>
		);
	}
}
