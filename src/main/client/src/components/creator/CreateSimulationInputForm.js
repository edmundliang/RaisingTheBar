import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import './CreateSimulationInputForm.scss';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const types = [
  {
    value: 'practice',
    label: 'Practice',
  },
  {
    value: 'test',
    label: 'Test',
  },
];


export default function CreateSimulationInputForm() {
  const classes = useStyles();
  const [type, setType] = React.useState('practice');

  const handleChange = event => {
    setType(event.target.value);
  };

  return (
    <div className="ml-4 mr-4 mt-1 mb-3">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField className="text-box-full" id="outlined-basic" label="Title" variant="outlined" />
        <TextField className="text-box-full" id="outlined-basic" label="Description" variant="outlined" />

        <TextField
          className="text-box-short"
          id="outlined-select-currency"
          select
          label="Select Type"
          value={type}
          onChange={handleChange}
          variant="outlined"
        >
          {types.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          className="create-button"
          type="submit"
          variant="contained"
          component="span"
        >
          Create
        </Button>
      </form>
    </div>
  );
}