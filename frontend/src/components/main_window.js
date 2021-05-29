import React, { Component } from 'react'
import './main_window.css'
import VerticalLinearStepper from './vertical_liniar_stepper'
import App from "../App";

/* The scoreboard component (which also consists of 2 'Team' component) one for every game session. */
class MainWindow extends Component {
    constructor(props) {
    super(props);
    this.state = {
            is_pressed_start: true
        }
    }

    render() {

        return (
			<div className="scoreboard">

                <div class="spacer">
                    {this.state.is_pressed_start ? 'wow' : <VerticalLinearStepper />}
	            </div>


			</div>
		)
    }
}

export default MainWindow;
