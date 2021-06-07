import React from "react";
import { AwesomeButton } from "react-awesome-button";
import './styles/welcome_window.css';

export default function WelcomeWindow() {

  return (
      <div className='welcome_to_marvel_ai'>
          <br/>
          <div className="words">
              <span>W</span>
              <span>E</span>
              <span>L</span>
              <span>C</span>
              <span>O</span>
              <span>M</span>
              <span>E</span>
          </div>

          <div className="words">
              <span>T</span>
              <span>O</span>
          </div>

          <div className="words">
              <span>M</span>
              <span>A</span>
              <span>R</span>
              <span>V</span>
              <span>E</span>
              <span>L</span>
              <span>.</span>
              <span>A</span>
              <span>I</span>
          </div>
          <br/>
          <div className='subtitle'>
              You create your own Alter-Ego
              <br/>
              And I will tell you if you are a HERO or a VILLAIN
              <br/>
              <div>
              </div>
              <br/>
          </div>
      </div>
  );
}