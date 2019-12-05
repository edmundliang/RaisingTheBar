import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "./QuickBar.scss";

export default class QuickBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="flex-container">
				<ul>
					<li>
						Spot 1
					</li>
					<li>
						Spot 2
					</li>
					<li>
						Spot 3
					</li>
				</ul>
			</div>
		);
	}
}
