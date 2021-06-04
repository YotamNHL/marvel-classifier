import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FadeIn from 'react-fade-in';
import reportWebVitals from './reportWebVitals';
import MainWindow from './components/main_window'

ReactDOM.render(
  <React.StrictMode>
      <FadeIn transitionDuration={1000} visable={20}>
        <MainWindow />
      </FadeIn>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
