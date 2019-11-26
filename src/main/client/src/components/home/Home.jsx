import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import NavigationBar from "./../navbar/NavigationBar";
import './Home.scss';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
          <Jumbotron>
            <h2>Welcome to Raising the Bar!</h2>
            <p>This is the website for training a bartender.</p>
          </Jumbotron>
 
      <div className="lander">
        <h3>Simulation</h3>
        <p>There are two different types of simulation, practice simulation and testing simulation. In the practice simulation, users
        are given a list of each steps where the user is allowed to practice and follow along with the recipe instructions. In the testing simulation, 
        there will be no steps given to the user as they will be tested on their knowledge of the recipes in the selected simulation. Users will then be graded
        based on the correctness of creating each recipe.</p>
      </div>
      
      <div className="lander">
        <h3>Creation Suite</h3>
        <p>The creation suite allows users to create a new simulation. To create a new simulation, users add the recipes they want the simulation to consist of
        from the recipe book. Users are also allowed to edit and view who has completed an existing simulation. </p>
      </div>
      
      <div className="lander">
        <h3>Workshop</h3>
        <p>The workshop consists of all the practice and testing simulations that have been created by the user. When a simulation is selected, the user will be redirected to that simulation.
        Users are also allowed to search for a simulation by name and view shareable links for a specific simulation.</p>
      </div>
      
      
    
      </React.Fragment>
      
      
    );
  }
}

