import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './IngredientsTable.scss';

export default class IngredientsTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryList: [],
			selected: null,
			ingredientsList: new Map()
		};
		for (var x of props.ingredients) {
			if (this.state.ingredientsList.get(x["category"]) == null) {
				this.state.ingredientsList.set(x["category"], []);
			}
			this.state.ingredientsList.get(x["category"]).push(x);
		}
		this.state.ingredientsList.forEach((value, key, map) => { this.state.categoryList.push(key) })
	}
	onListElementClick(item, event) {
		if (item !== this.state.selected) {
			var callback = this.props.onSelectedChangeCallback;
			callback(item)
			this.setState({ selected: item })
		}
	}
	render() {
		return (

			<Tabs defaultActiveKey={this.state.categoryList[0]}>
				{
					this.state.categoryList.map((item) => (
						<Tab key={item} eventKey={item} title={item}>
							<div className="flex-container">
								{(() => {
									var output = [];
									var elements = this.state.ingredientsList.get(item)
									for (var x of elements) {
										let boundFunctionCall = this.onListElementClick.bind(this, x);
										output.push(
											<div className={this.state.selected === x ? "list_element selected" : "list_element"}  key={x["name"]} onClick={boundFunctionCall}>{x["name"]}</div>
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
