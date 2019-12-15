import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import './CreateSimulationInputForm.scss';

export default class CreateSimulationInputForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      public: "",
      practice: ""
    }
    // this.useStyles = makeStyles(theme => ({
    //   root: {
    //     '& > *': {
    //       margin: theme.spacing(1),
    //       width: 200,
    //     },
    //     '& .MuiTextField-root': {
    //       margin: theme.spacing(1),
    //       width: 200,
    //     },
    //     '& Button': {
    //       margin: theme.spacing(1),
    //       width: 200,
    //     },
    //   },
    // }));

    // this.classes = this.useStyles();
    // const [type, setType] = React.useState('practice');
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    if (e.target.type === "checkbox") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      if ((e.target.name == "name" && e.target.value.length > 50)) {
        return;
      }
      if ((e.target.name == "description" && e.target.value.length > 500)) {
        return;
      }
      this.setState({ [e.target.name]: e.target.value });
    }
    // e.persist()
    // console.log(e)
    // console.log(this.state)
  }

  onSubmit(event) {
    // console.log(this.state)
    this.props.createSimulation(this.state);
  }

  render() {
    return (
      <div className="ml-4 mr-4 mt-1 mb-3">
        <form>
          <TextField className="text-box-full" id="outlined-basic" label="Title" name="name" variant="outlined" onChange={this.handleChange} />
          <TextField className="text-box-full" id="outlined-basic" label="Description" name="description" variant="outlined" onChange={this.handleChange} />

          <TextField className="text-box-short" id="outlined-select-currency" select label="Private or Public" name="public" variant="outlined" onChange={this.handleChange}>
            <MenuItem key={"public"} value={true}>Public</MenuItem>
            <MenuItem key={"private"} value={false}>Private</MenuItem>
          </TextField>

          <TextField className="text-box-short" id="outlined-select-currency" select label="Practice or Test" name="practice" variant="outlined" onChange={this.handleChange}>
            <MenuItem key={"practice"} value={true}>Practice</MenuItem>
            <MenuItem key={"test"} value={false}>Test</MenuItem>
          </TextField>
          <Button className="create-button" type="submit" variant="contained" color="primary" component="span" onClick={this.onSubmit}>
            Create
        </Button>
        </form>
      </div>
    );
  }
}