import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { DIVISIBLE, getTotalNumber } from '../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

function Form() {
  const [firstNumber, setFirstNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case 'firstNumber':
        setFirstNumber(event.target.value);
        break;
      case 'secondNumber':
        setSecondNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleProcess = (): void => {
    if (!firstNumber || !secondNumber ) {
      alert('Input can not be empty');
      return;
    }

    // const regex = new RegExp("^[0-9]+$");
    // if (!regex.test(firstNumber) || !regex.test(secondNumber)) {
    //   alert('Both values must be numbers');
    // }

    let start = Number(firstNumber);
    let end = Number(secondNumber);

    if (isNaN(start) || isNaN(end)) {
      alert('Both values must be numbers');
    } else if ( start <= 0 || end <=0 ) {
      alert('The number should be bigger than 0');
    } else if (start === end) {
      const val = start % DIVISIBLE;
      alert(val);
    } else if (start > end) {
      const val = getTotalNumber(end, start);
      alert(val);
    } else {
      const val = getTotalNumber(start, end);
      alert(val);
    }

    setFirstNumber('');
    setSecondNumber('');
  };

  return (
    <form noValidate autoComplete="off" data-testid="form">
      <Grid container direction="column" alignItems="center" spacing={2} className={classes.root}>
        <TextField
          data-testid="firstNumber"
          id="firstNumber"
          label="First Number"
          name="firstNumber"
          value={firstNumber}
          onChange={handleChange}
        />
        <TextField
          data-testid="secondNumber"
          id="secondNumber"
          label="Second Number"
          name="secondNumber"
          value={secondNumber}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleProcess}
        >
          Process
        </Button>
      </Grid>
    </form>
  );
}

export default Form;
