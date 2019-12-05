import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "./QuickBar.scss";

export default class QuickBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="quick-bar">
				<img draggable src="/images/actions/empty_spot.png" alt="empty spot" />
				<img draggable src="/images/actions/empty_spot.png" alt="empty spot" />
				<img draggable src="/images/actions/empty_spot.png" alt="empty spot" />
			</div>
		);
	}
}
