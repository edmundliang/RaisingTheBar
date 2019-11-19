import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './NavigationBar.css';
import Logo from "../assets/logo.png";

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/home">
          <img className="logo" src={Logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item><Nav.Link href="/home"> Home </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/simulation"> Simulation </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/creator"> Creator </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/workshop"> Workshop </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/recipe"> Recipe </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/"> Logout </Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
