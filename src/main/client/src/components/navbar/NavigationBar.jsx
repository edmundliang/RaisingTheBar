import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from "./../../assets/logo.png";
import './NavigationBar.scss';

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar expand="lg" fixed="top">
        <Navbar.Brand href="/">
          <img className="logo" src={Logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item><Nav.Link href="/"> Home </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/simulation"> Simulation </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/creator"> Creation Suite </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/workshop"> Workshop </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/recipe" > Recipes </Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/"> Account </Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
