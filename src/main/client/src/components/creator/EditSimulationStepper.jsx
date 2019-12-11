import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Col, Jumbotron, Row} from "react-bootstrap";
import EditSimulationSimulationCard from './EditSimulationSimulationCard';
import './EditSimulationStepper.scss'
import CreateSimulationRecipeTable from "./CreateSimulationRecipeTable";
import CreateSimulationInputForm from "./CreateSimulationInputForm";
import RecipeCard from "./RecipeCard";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Select Simulation', 'Edit Simulation'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Select or delete a simulation that you want to edit.`;
    case 1:
      return 'Edit recipes or information, and confirm the changes.';
    default:
      return 'Unknown step';
  }
}

export default function EditSimulationStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const Simulations = [
    {
      title: "Simulation title 1",
      recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
      description: "Description example. wejti., rjewirje wi",
      type: "Practice",
    },
    {
      title: "Simulation title 2",
      recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
      description: "Description example. wejti., rjewirje wi",
      type: "Test",
    },
    {
      title: "Simulation title 3",
      recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
      description: "Description example. wejti., rjewirje wi",
      type: "Test",
    },
    {
      title: "Simulation title 4",
      recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
      description: "Description example. wejti., rjewirje wi",
      type: "Practice",
    },
    {
      title: "Simulation title 5",
      recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
      description: "Description example. wejti., rjewirje wi",
      type: "Practice",
    },
    {
      title: "Simulation title 6",
      recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
      description: "Description example. wejti., rjewirje wi",
      type: "Practice",
    },
    {
      title: "Simulation title 7",
      recipes: ["test recipe1", "test recipe2", "test recipe3", "test recipe4"],
      description: "Description example. wejti., rjewirje wi",
      type: "Test",
    },
  ];

  const Recipes = [
    {
      recipeName: "Recipe title 1",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 2",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 3",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 4",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 5",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 6",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 7",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 8",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 9",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 10",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 11",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 12",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 13",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
    {
      recipeName: "Recipe title 14",
      ingredients: ["test ingredient1", "test ingredient1", "test ingredient1", "test ingredient1"],
      add: "Add",
    },
  ];

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {activeStep === 0 && (
                    <div className="mt-4 text-center container-fluid d-flex justify-content-center">
                      <Row className="custom-row">
                        <Col xs={12} md={8}>
                          <Jumbotron fluid className="edit-jumbo p-0">
                            <div className="left-container">
                              <Col className="mt-0">
                                <div className="row p-1">
                                  {Simulations.map(simulation => (
                                    <div className="col pt-1">
                                      <EditSimulationSimulationCard key={simulation.title} simulation={simulation} />
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
                  {activeStep === 1 && (
                    <div className="mt-4 text-center container-fluid d-flex justify-content-center">
                      <Row className="custom-row">
                        <Col xs={12} md={8}>
                          <Jumbotron fluid className="jumbo p-0">
                            <div className="left-container">
                              <Col className="mt-2">
                                <div className="row p-1">
                                  {Recipes.map(recipe => (
                                    <div className="col">
                                      <RecipeCard key={recipe.recipeName} recipe={recipe} />
                                    </div>
                                  ))}
                                </div>
                              </Col>
                            </div>
                          </Jumbotron>
                        </Col>

                        <Col xs={6} md={4}>
                          <Jumbotron fluid className="jumbo p-0">
                            <div className="right-container">
                              <Row>
                                <Col>
                                  <CreateSimulationRecipeTable/>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <CreateSimulationInputForm/>
                                </Col>
                              </Row>
                            </div>
                          </Jumbotron>
                        </Col>
                      </Row>
                    </div>
                  )}
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Changes have been made.</Typography>
          <Button onClick={handleReset} className={classes.button} variant="contained" color="secondary">
            Edit Other Simulation
          </Button>
        </Paper>
      )}
    </div>
  );
}
