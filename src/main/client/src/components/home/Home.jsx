import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import NavigationBar from "./../navbar/NavigationBar";
import bgimage from "../../assets/background.jpg";
import './Home.scss';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <div id="home">
          <Jumbotron style={{ backgroundImage: `url(${bgimage})` }}>
            <h1 className="center">RAISING THE BAR</h1>
            <h4 className="center">A REALISTIC BARTENDING SIMULATOR GAME</h4>
          </Jumbotron>

          <div id="leftbox" className="center">
            <h3>Creation Suite</h3>
            <p>The creation suite allows users to create a new simulation. To create a new simulation, users add the recipes they want the simulation to consist of
        from the recipe book. Users are also allowed to edit and view who has completed an existing simulation. </p>
            <a className="btn btn-info" href="/creator">Creation Suite</a>
          </div>

          <div id="rightbox" className="center">
            <h3>Workshop</h3>
            <p>The workshop consists of all the practice and testing simulations that have been created by the user. When a simulation is selected, the user will be redirected to that simulation.
        Users are also allowed to search for a simulation by name and view shareable links for a specific simulation.</p>
            <a className="btn btn-info" href="/workshop">Workshop</a>
          </div>
        </div>



      </React.Fragment>


    );
  }
}

