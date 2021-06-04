import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import FormControl from '@material-ui/core/FormControl';
import './styles/vertical_liniar_stepper.css'
import {RangeStepInput} from 'react-range-step-input';
import 'rc-checkbox/assets/index.css';



export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [state, setState] = React.useState({
        username: '',
        Gender: 'Male',
        HairColor: 'No Hair',
        EyeColor: '',
        Race: 'Unknown Race',
        Strength: 50,
        Speed: 50,
        Durability: 50,
        Power: 50,
        Combat: 50,
        Intelligence: 50,
        Height: 170,
        Weight: 75,
        'Super Strength': false,
        'Stamina': false,
        'Stealth': false,
        'Enhanced Senses': false,
        'Flight': false,
        'Energy Blasts': false,
        'Energy Absorption': false,
        'Shapeshifting': false,
        'Accelerated Healing': false,
        'Force Fields': false,
        'Psionic Powers': false,
        'Weapon-based Powers': false,
        'Energy Manipulation': false,
        'Reflexes': false,
        'Molecular Manipulation': false,
        'Super Durability': false,
        'Agility': false,
        'Longevity': false,
        'Super Speed': false,
        goodOrEvil: false,
        isRequestSent: false,
        isResultReady: false
    });

    const superpowers = ['Super Strength',
                           'Stamina',
                           'Stealth',
                           'Enhanced Senses',
                           'Flight',
                           'Energy Blasts',
                           'Energy Absorption',
                           'Shapeshifting',
                           'Accelerated Healing',
                           'Force Fields',
                           'Psionic Powers',
                           'Weapon-based Powers',
                           'Energy Manipulation',
                           'Reflexes',
                           'Molecular Manipulation',
                           'Super Durability',
                           'Agility',
                           'Longevity',
                           'Super Speed'
        ]
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
    const classes = useStyles();

    const handleChangeInput = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    };

    const handleChangeCheckbox = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setState({...state,
                        isRequestSent: false,
                        isResultReady: false
        })
    };

    function returnLoadingGif() {
        const gif_div = <div className="image-blurred-edge">
            <img src="thinking_loading.gif"/>
            <br/>
            Thinking...
        </div>
        return gif_div
    }

    function returnResult() {
        let resultStr = "You are..."
        let subtitleStr;
        let gif_url;
        if(state.goodOrEvil) {
            gif_url = "thanos_dance.gif"
            resultStr += "A SUPERVILLAIN!"
            subtitleStr =  "have fun causing havoc"
        }
        else{
            gif_url = "spiderman_loading.gif"
            resultStr += "A SUPERHERO!"
            subtitleStr =  "You're one of the good guys!"
        }
        const gif_div = <div className="gif_div_style">
                            {resultStr}
                            <br/>
                            {subtitleStr}
                            <br/>
                            <img src={gif_url} />
                        </div>
        return gif_div
    }

    function getHeroProba() {
        let all_features_dict = state
        let all_features_string = JSON.stringify(all_features_dict).replace(/%22/g,"")
        let url = "http://127.0.0.1:5000/getGoodBadProbability?HeroData=" + all_features_string;
        return fetch(url)
            .then((res) => {return res.json();})
            .then(data => data['result']);
    }

    function putResultInState() {
        setState({...state, isRequestSent: true})
        getHeroProba()
            .then((value) => setState({...state,
                                                        isRequestSent: true,
                                                        isResultReady:true,
                                                        goodOrEvil: value}));
    }

    function getSteps() {
        return ['Basic Info', 'Stats', 'Super Powers'];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return getBasicInfo();
            case 1:
                return getStatsInfo();
            case 2:
                return getSuperPowers();
            default:
                return 'Unknown step';
        }
    }

    function getBasicInfo() {
    const basicInfoInputs =
        <div className='basic_info_class'>
            <TextField id="username" name="username" label="Super Name" variant="filled" placeholder='e.g. Spider-Megaboy' onChange={handleChangeInput}/>
            <br/>
            <br/>
            <FormControl className='Class2' fullWidth>
                <Select
                    native
                    inputProps={{
                        name: 'Gender',
                        id: 'filled-gender-native-simple',
                    }}
                    name='Gender'
                    defaultValue='Male'
                    label='Gender'
                    onChange={handleChangeInput}
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
                    name="HairColor"
                    onChange={handleChangeInput}
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
                    name="EyeColor"
                    onChange={handleChangeInput}

                    inputProps={{
                        name: 'EyeColor',
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
                    name="Race"
                    onChange={handleChangeInput}
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
                <RangeStepInput name="Strength" min={0} max={100} step={1}
                                onChange={handleChangeInput}/> {state.Strength}
                <Typography gutterBottom>Speed</Typography>
                <RangeStepInput name="Speed" min={0} max={100} step={1}
                                onChange={handleChangeInput}/> {state.Speed}
                <Typography gutterBottom>Durability</Typography>
                <RangeStepInput name="Durability" min={0} max={100} step={1}
                                onChange={handleChangeInput}/> {state.Durability}
                <Typography gutterBottom>Power</Typography>
                <RangeStepInput name="Power" min={0} max={100} step={1}
                                onChange={handleChangeInput}/> {state.Power}
                <Typography gutterBottom>Combat</Typography>
                <RangeStepInput name="Combat" min={0} max={100} step={1}
                                onChange={handleChangeInput}/> {state.Combat}
                <Typography gutterBottom>Intelligence</Typography>
                <RangeStepInput name="Intelligence" min={0} max={100} step={1}
                                onChange={handleChangeInput}/> {state.Intelligence}
            </div>
        return statsInfoInputs
    }

    function renderCheckbox(superpower) {
        const superpowerState = "state." + superpower;
        const superpower_classname = "superpower_" + superpower
        const checkbox =
                <div className={superpower_classname}>
                        <input
                            name={superpower}
                            value={superpowerState}
                            type="checkbox"
                            onChange={handleChangeCheckbox}
                        />

                        {superpower}
                </div>
        return checkbox
    }

    function listCheckboxesBySuperpower() {
        let i = 0;
        let checkboxesList = []

        for (i = 0; i < superpowers.length; i++) {
            checkboxesList.push(renderCheckbox(superpowers[i]))
        }
        return checkboxesList
    }

    function getSuperPowers() {
        const superPowers =
                <div className="all_superpowers_div">
                    {listCheckboxesBySuperpower()}
                </div>
        return superPowers
    }


    return (
        <div className='wrapper2'>
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
                        {state.isRequestSent ? null : putResultInState()}
                        {state.isResultReady ? returnResult() : returnLoadingGif()}
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        </div>
    );
}