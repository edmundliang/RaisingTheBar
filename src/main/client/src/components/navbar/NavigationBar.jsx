import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from "./../../assets/logo.png";
import './NavigationBar.css';
import '../Theme.css';

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <img className="logo" src={Logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item><Nav.Link href="/" className ="theme-primary-text-color"> Home </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/simulation" className ="theme-primary-text-color"> Simulation </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/creator" className ="theme-primary-text-color"> Creation Suite </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/workshop" className ="theme-primary-text-color"> Workshop </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/recipe" className ="theme-primary-text-color"> Recipes </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/" className ="theme-primary-text-color"> Account </Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
