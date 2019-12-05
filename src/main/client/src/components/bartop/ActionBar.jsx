import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "./ActionBar.scss";

export default class QuickBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="flex-container">
				<ul>
					<li>
						Action 1 Image
					</li>
					<li>
						Action 2 Image
					</li>
					<li>
						Action 3 Image
					</li>
				</ul>
			</div>
		);
	}
}
