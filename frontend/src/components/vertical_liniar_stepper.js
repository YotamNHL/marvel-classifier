import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import './vertical_liniar_stepper.css'

const useStyles = makeStyles((theme) => ({
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

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function getSteps() {
  return ['Marvel AI', 'Basic Info', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Welcome to MARVELAI!'
    case 1:
      return getBasicInfo();
    case 2:
      return getStatsInfo();
    default:
      return 'Unknown step';
  }
}

function getBasicInfo() {
    const basicInfoInputs =
        <div className='basic_info_class'>
            <TextField id="filled-basic" label="Super Name" variant="filled" placeholder='e.g. Spider-Megaboy'/>
            <br/>
            <br/>
            <FormControl className='Class2' fullWidth>
                <Select
                    native
                    inputProps={{
                        name: 'Gender',
                        id: 'filled-gender-native-simple',
                    }}
                    defaultValue='Male'
                    label='Gender'
                >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </Select>
            </FormControl>
            <br/>
            <br/>
            <FormControl className='Class2' fullWidth>
                <InputLabel htmlFor="filled-age-native-simple">Hair Color</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    inputProps={{
                        name: 'HairColor',
                        id: 'age-native-simple',
                    }}
                >
                    <MenuItem value='Black'>Black</MenuItem>
                    <MenuItem value='Brown'>Brown</MenuItem>
                    <MenuItem value='Red'>Red</MenuItem>
                    <MenuItem value='Blond'>Blond</MenuItem>
                    <MenuItem value='Grey'>Grey</MenuItem>
                    <MenuItem value='Purple'>Purple</MenuItem>
                    <MenuItem value='Blue'>Blue</MenuItem>
                    <MenuItem value='Green'>Green</MenuItem>
                    <MenuItem value='White'>White</MenuItem>
                    <MenuItem value='Strawberry Blond'>Strawberry Blond</MenuItem>
                    <MenuItem value='Silver'>Silver</MenuItem>
                    <MenuItem value='No Hair'>No Hair</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <br/>
            <FormControl className='class3' fullWidth>
                <InputLabel htmlFor="filled-age-native-simple">Eye Color</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    inputProps={{
                        name: 'HairColor',
                        id: 'age-native-simple',
                    }}
                >
                    <MenuItem value='Black'>Black</MenuItem>
                    <MenuItem value='Brown'>Brown</MenuItem>
                    <MenuItem value='Yellow'>Yellow</MenuItem>
                    <MenuItem value='Grey'>Grey</MenuItem>
                    <MenuItem value='Purple'>Purple</MenuItem>
                    <MenuItem value='Red'>Red</MenuItem>
                    <MenuItem value='Blue'>Blue</MenuItem>
                    <MenuItem value='Green'>Green</MenuItem>
                    <MenuItem value='White'>White</MenuItem>
                    <MenuItem value='Silver'>Silver</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <br/>
            <FormControl className='class4' fullWidth>
                <InputLabel htmlFor="filled-age-native-simple">Race</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    inputProps={{
                        name: 'Race',
                        id: 'age-native-simple',
                    }}
                >
                    <MenuItem value='Alien'>Alien</MenuItem>
                    <MenuItem value='Android'>Android</MenuItem>
                    <MenuItem value='Animal'>Animal</MenuItem>
                    <MenuItem value='Asgardian'>Asgardian</MenuItem>
                    <MenuItem value='Atlantean'>Atlantean</MenuItem>
                    <MenuItem value='Clone'>Clone</MenuItem>
                    <MenuItem value='Cyborg'>Cyborg</MenuItem>
                    <MenuItem value='Demon'>Demon</MenuItem>
                    <MenuItem value='Eternal'>Eternal</MenuItem>
                    <MenuItem value='Flora Colossus'>Flora Colossus</MenuItem>
                    <MenuItem value='Frost Giant'>Frost Giant</MenuItem>
                    <MenuItem value='God / Eternal'>God / Eternal</MenuItem>
                    <MenuItem value='Human'>Human</MenuItem>
                    <MenuItem value='Inhuman'>Inhuman</MenuItem>
                    <MenuItem value='Luphomoid'>Luphomoid</MenuItem>
                    <MenuItem value='Mutant'>Mutant</MenuItem>
                    <MenuItem value='Neyaphem'>Neyaphem</MenuItem>
                    <MenuItem value='Spartoi'>Spartoi</MenuItem>
                    <MenuItem value='Strontian'>Strontian</MenuItem>
                    <MenuItem value='Symbiote'>Symbiote</MenuItem>
                    <MenuItem value='Vampire'>Vampire</MenuItem>
                    <MenuItem value='Zen-Whoberian'>Zen-Whoberian</MenuItem>
                </Select>
            </FormControl>
        </div>
    return basicInfoInputs
}

function getStatsInfo() {
    const statsInfoInputs =
        <div className='sliders_class'>
            <Typography gutterBottom>Strength</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50}/>
            <Typography gutterBottom>Speed</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50}/>
            <Typography gutterBottom>Durability</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50}/>
            <Typography gutterBottom>Power</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50}/>
            <Typography gutterBottom>Combat</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50}/>
            <Typography gutterBottom>Intelligence</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50}/>
        </div>
    return statsInfoInputs
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
  );
}