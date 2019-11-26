import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './IngredientsTable.scss';

export default class IngredientsTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: null
		};
	}
	onListElementClick(item, event) {
		if (item !== this.state.selected) {
			var callback = this.props.onSelectedChangeCallback;
			callback(item)
			this.setState({ selected: item })
		}
	}
	render() {

		let categoryList = [];
		let ingredientsList = new Map();
		if (this.props.ingredients != null) {
			for (var x of this.props.ingredients) {
				if (ingredientsList.get(x["type"]) == null) {
					ingredientsList.set(x["type"], []);
				}
				ingredientsList.get(x["type"]).push(x);
			}
			ingredientsList.forEach((value, key, map) => { categoryList.push(key) })
		}
		return (

			<Tabs defaultActiveKey={categoryList[0]}>
				{
					categoryList.map((item) => (
						<Tab key={item} eventKey={item} title={item}>
							<div className="flex-container">
								{(() => {
									var output = [];
									var elements = ingredientsList.get(item)
									for (var x of elements) {
										let boundFunctionCall = this.onListElementClick.bind(this, x);
										output.push(
											<div className={this.state.selected === x ? "list_element selected" : "list_element"} key={x["name"]} onClick={boundFunctionCall}>{x["name"]}</div>
										);
									}
									return output;
								}).call()
								}
							</div>
						</Tab>
					))}
			</Tabs>
		);
	}
}
