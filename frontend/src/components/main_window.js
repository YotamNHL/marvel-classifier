import React, {Component} from 'react'
import './styles/main_window.css'
import VerticalLinearStepper from './vertical_liniar_stepper'
import WelcomeWindow from "./welcome_window";
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

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
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default MainWindow;
