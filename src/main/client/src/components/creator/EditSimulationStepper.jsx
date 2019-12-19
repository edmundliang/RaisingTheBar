import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Col, Jumbotron, Row } from "react-bootstrap";
import EditSimulationSimulationCard from './EditSimulationSimulationCard';
import './EditSimulationStepper.scss'
import CreateSimulationRecipeTable from "./CreateSimulationRecipeTable";
import CreateSimulationInputForm from "./CreateSimulationInputForm";
import RecipeCard from "./RecipeCard";
import CreateSimulation from "./CreateSimulation";

export default class EditSimulationStepper extends Component {

  constructor() {
    super();

    this.state = {
      activeStep: 0,
      selectedSimulation: null
    };
    this.numSteps = 2;
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.selectedSimulation = this.selectedSimulation.bind(this);
  }
  handleNext() {
    console.log(this.state.activeStep);
    this.setState({ activeStep: this.state.activeStep + 1 < this.numSteps ? this.state.activeStep + 1 : 0 })
    console.log(this.state.activeStep);
  }

  handleBack() {
    console.log(this.state.activeStep);
    this.setState({ activeStep: this.state.activeStep - 1 > 0 ? this.state.activeStep - 1 : 0 })
    console.log(this.state.activeStep);
  }

  handleReset() {
    this.setState({ activeStep: 0 })
  }

  selectedSimulation(data) {
    this.setState({ activeStep: 1, selectedSimulation: data })
  }

  render() {
    var steps = ['Select Simulation', 'Edit Simulation'];
    var stepContent = ["Select or delete a simulation that you want to edit.", "Edit recipes or information, and confirm the changes."]
    return (
      <div className="root">
        <Stepper activeStep={this.state.activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{stepContent[index]}</Typography>
                <div className="actionsContainer">
                  <div>
                    {this.state.activeStep === 0 && (
                      <div className="mt-4 text-center container-fluid d-flex justify-content-center">
                        <Row className="custom-row">
                          <Col xs={12} md={8}>
                            <Jumbotron fluid className="edit-jumbo p-0">
                              <div className="left-container">
                                <Col className="mt-0">
                                  <div className="row p-1">
                                    {this.props.simulations.map(simulation => (
                                      <div className="col pt-1" key={simulation.id}>
                                        <EditSimulationSimulationCard selectSimulationCallback={this.selectedSimulation} simulation={simulation} />
                                      </div>
                                    ))}
                                  </div>
                                </Col>
                              </div>
                            </Jumbotron>
                          </Col>
                        </Row>
                      </div>
                    )}
                    {this.state.activeStep === 1 && (
                      <div className="mt-4 text-center container-fluid d-flex justify-content-center">
                        <CreateSimulation history ={this.props.history} simulation={this.state.selectedSimulation} recipes={this.props.recipes} />
                      </div>
                    )}
                    <div onClick={this.handleBack}>
                      <Button disabled={this.state.activeStep === 0} className={"button"}>
                        Back
                  </Button>
                  </div>                  
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {this.state.activeStep === steps.length && (
          <Paper square elevation={0} className={"resetContainer"}>
            <Typography>Changes have been made.</Typography>
            <Button onClick={this.handleReset} className={"button"} variant="contained" color="secondary">
              Edit Other Simulation
          </Button>
          </Paper>
        )}
      </div>
    );
  }
}
