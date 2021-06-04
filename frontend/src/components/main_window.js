import React, {Component} from 'react'
import './styles/main_window.css'
import VerticalLinearStepper from './vertical_liniar_stepper'
import WelcomeWindow from "./welcome_window";
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import ReactAudioPlayer from 'react-audio-player';

/* The scoreboard component (which also consists of 2 'Team' component) one for every game session. */
class MainWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_pressed_start: false
        }
    }

    pressed_start_handler = () => {
        let curr_state = this.state.is_pressed_start;
        this.setState({is_pressed_start: !curr_state})
    }


    render() {


        return (
            <div>
                <div className="scoreboard">
                    <div class="spacer">
                        {this.state.is_pressed_start ? <VerticalLinearStepper/> : <WelcomeWindow/>}
                    </div>
                </div>
                <div className='button_style'>
                    {this.state.is_pressed_start ? '' :
                        <AwesomeButton type="youtube" onPress={this.pressed_start_handler}>Lets Go</AwesomeButton>}
                </div>
                <div className="audio_player">
                    <ReactAudioPlayer
                        src="avengers_theme_8bit.mp3"
                        autoPlay={true}
                        controls
                        loop
                        muted
                    />
                </div>
            </div>
        )
    }
}

export default MainWindow;
