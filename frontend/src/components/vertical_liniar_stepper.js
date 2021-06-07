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
import './styles/typing.css'
import {RangeStepInput} from 'react-range-step-input';
import 'rc-checkbox/assets/index.css';
import GaugeChart from 'react-gauge-chart'
import FadeIn from 'react-fade-in';
import {F} from "react-select/dist/index-4bd03571.esm";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';



export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [state, setState] = React.useState({
        username: '',
        Gender: 'Male',
        HairColor: 'No Hair',
        EyeColor: 'Black',
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
    const superpowers_to_emojy = {
                           'Super Strength': '💪',
                           'Stamina': '🏃',
                           'Stealth': '🤫',
                           'Enhanced Senses': '🧐',
                           'Flight': '✈️',
                           'Energy Blasts': '⚡',
                           'Energy Absorption': '🧽',
                           'Shapeshifting': '🦎',
                           'Accelerated Healing': '🩹',
                           'Force Fields': '🛡️',
                           'Psionic Powers': '🔮',
                           'Weapon-based Powers': '🪓',
                           'Energy Manipulation': '🪄',
                           'Reflexes': '🐈',
                           'Molecular Manipulation': '⚛️',
                           'Super Durability': '✊',
                           'Agility': '💨',
                           'Longevity': '👴',
                           'Super Speed': '🏁'
    }
    const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: '#a9334e',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
        color: '#a9334e'
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    icon: {
        backgroundColor: '#a9334e',
    },
    bigAvatar: {
        margin: 10,
        width: 70,
        height: 70,
    }
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
        console.log(document.location.hostname)
        const gif_div = <div className="gif_div_style">
                            <img src="thinking_loading.gif"/>
                            <br/>
                            <div className="icons_div">
                                Thinking...
                            </div>
                        </div>
        return gif_div
    }

    function returnResult() {
        let resultStr = "You will become..."
        let subtitleStr;
        let gif_url;
        if(state.goodOrEvil['result']) {
            gif_url = "thanos_dance.gif"
            resultStr += "A SUPERVILLAIN!"
            subtitleStr =  "have fun causing havoc."
        }
        else{
            gif_url = "spiderman_loading.gif"
            resultStr += "A SUPERHERO!"
            subtitleStr =  "Enjoy being one of the good ones."
        }
        let indicators = state.goodOrEvil['indicators']
        let indicatorsStr = "The main indicators for my assesments are the following elements: \n"

        for(let i=0; i < indicators.length; i++) {
            indicatorsStr += indicators[i] + ", "
        }
        indicatorsStr = indicatorsStr.substring(0, indicatorsStr.length - 2);
        indicatorsStr += "."
        const gif_div = <div className="result_div_style">
                            <FadeIn>
                                {resultStr}
                            </FadeIn>
                            <br/>
                            <br/>
                            <FadeIn delay={1300}>
                                <GaugeChart id="gauge-chart3"
                                  nrOfLevels={20}
                                  arcWidth={0.3}
                                     colors={["#ff0f22", "#1aff00"]}
                                  percent={state.goodOrEvil['certainty'] / 100}
                                  textColor="black"
                                  formatTextValue={value => value+'% Certainty'}
                                />
                            </FadeIn>
                            <br/>
                            <br/>
                            <FadeIn delay={1800}>
                                {indicatorsStr}
                            </FadeIn>
                            <br/>
                            <br/>
                            <FadeIn delay={2500}>
                                {subtitleStr}
                            </FadeIn>
                            <br/>
                            <FadeIn delay={3000}>
                                <div className="gif_div_style">
                                    <img src={gif_url} />
                                </div>
                            </FadeIn>
                            <div className='icons_div'>
                                <Grid className="icon_grid">
                                    <FadeIn delay={3500}>
                                        <div className="icon_div">
                                            <Avatar alt="Yotam Levanon" src="icon.jpeg" className={classes.bigAvatar}/>
                                        </div>
                                    </FadeIn>
                                    <FadeIn delay={3600}>
                                        <div className="icon_div">
                                            <a href="https://github.com/YotamNHL/marvel-classifier" target="_blank">
                                                <Avatar alt="github" src="githubicon.png" className={classes.bigAvatar}/>
                                            </a>
                                        </div>
                                    </FadeIn>
                                    <FadeIn delay={3700}>
                                        <div className="icon_div">
                                            <a href="https://github.com/YotamNHL/marvel-classifier/blob/master/main.ipynb" target="_blank">
                                                <Avatar alt="jupyter" src="jupyter.png" className={classes.bigAvatar}/>
                                            </a>
                                        </div>
                                    </FadeIn>
                                    <FadeIn delay={3800}>
                                        <div className="icon_div">
                                            <a href="https://www.linkedin.com/in/yotam-levanon-8a4b58122/" target="_blank">
                                                <Avatar alt="linkedin" src="linkedinicon.png" className={classes.bigAvatar}/>
                                            </a>
                                        </div>
                                    </FadeIn>
                                </Grid>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>

        return gif_div
    }

    function getHeroProba() {
        let all_features_dict = state
        let all_features_string = JSON.stringify(all_features_dict).replace(/%22/g,"")
        let url = "https://marvel-ai.herokuapp.com/getGoodBadProbability?HeroData=" + all_features_string;
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
            <TextField id="Height" name="Height" label="Height" variant="filled" placeholder='in CM' onChange={handleChangeInput}/>
            <br/>
            <br/>
            <TextField id="Weight" name="Weight" label="Weight" variant="filled" placeholder='in KG' onChange={handleChangeInput}/>
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
                    <MenuItem value='Green'>Green</MenuItem>
                    <MenuItem value='White'>White</MenuItem>
                    <MenuItem value='No Hair'>No Hair</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>

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
                    <MenuItem value='black'>Black</MenuItem>
                    <MenuItem value='brown'>Brown</MenuItem>
                    <MenuItem value='yellow'>Yellow</MenuItem>
                    <MenuItem value='red'>Red</MenuItem>
                    <MenuItem value='blue'>Blue</MenuItem>
                    <MenuItem value='green'>Green</MenuItem>
                    <MenuItem value='white'>White</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
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
                    <MenuItem value='Asgardian'>Asgardian</MenuItem>
                    <MenuItem value='Cyborg'>Cyborg</MenuItem>
                    <MenuItem value='Demon'>Demon</MenuItem>
                    <MenuItem value='God / Eternal'>God / Eternal</MenuItem>
                    <MenuItem value='Human'>Human</MenuItem>
                    <MenuItem value='Inhuman'>Inhuman</MenuItem>
                    <MenuItem value='Mutant'>Mutant</MenuItem>
                    <MenuItem value='Cosmic Entity'>Cosmic Entity</MenuItem>
                    <MenuItem value='Radiation'>Radiation</MenuItem>
                    <MenuItem value='Symbiote'>Symbiote</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
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
                        {superpowers_to_emojy[superpower]}
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