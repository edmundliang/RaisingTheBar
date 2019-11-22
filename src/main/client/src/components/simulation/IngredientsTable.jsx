import React, { Component } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

// import 'react-tabs/style/react-tabs.css';
import './Simulation.scss';

export default class IngredientsTable extends Component {
	constructor(props) {
		super(props);

		this.selected = null;
		this.categoryList = [];
		this.ingredientsList = new Map();
		for (var x of props.ingredients) {
			if (this.ingredientsList.get(x["category"]) == null) {
				this.ingredientsList.set(x["category"], []);
			}
			this.ingredientsList.get(x["category"]).push(x);
		}
		this.ingredientsList.forEach((value, key, map) => { this.categoryList.push(key) })
	}
	onListElementClick(item, event) {
		if(item !== this.selected) {
			var callback = this.props.onSelectedChangeCallback;
			callback(item)
			this.selected = item;
		}
	}
	render() {
		return (
			<Tabs>
				<TabList>
					{
						this.categoryList.map((item) => (<Tab key={item}>{item}</Tab>))
					}
				</TabList>
				{
					this.categoryList.map((item) => {
						return <TabPanel key={item}>{(() => {

							var output = [];
							var elements = this.ingredientsList.get(item)
							for (var x of elements) {
								let boundFunctionCall = this.onListElementClick.bind(this, x);
								output.push(
									<div className="list_element" key={x["name"]} onClick={boundFunctionCall}>
										<span>{x["name"]}</span>
									</div>
								);
							}
							return output;
						}).call()
						}</TabPanel>
					})
				}
			</Tabs>
		);
	}
}
