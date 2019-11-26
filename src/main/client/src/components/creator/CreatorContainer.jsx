import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import NavigationBar from "./../navbar/NavigationBar";
import './CreatorContainer.scss';

export default class CreatorContainer extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Tabs defaultActiveKey={"Simulation"}>
          <Tab key={"Simulation"} title={"Simulation"}>
            Simulation
          </Tab>
          <Tab key={"Recipies"}  title={"Recipies"}>
            Recipies
          </Tab>
        </Tabs>
      </div>
    )
  }
}
