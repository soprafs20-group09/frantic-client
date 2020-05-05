import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.scss';
import App from 'components/App';

import "typeface-montserrat";
import settingsManager from "utils/settingsManager";

// if the screen is smaller than what I deem usable with normal scale
if (window.innerHeight < 860) {
    calibrateFontSize();
}

// load the user-selected theme
settingsManager.applyTheme();

ReactDOM.render(<App/>, document.getElementById('root'));

// this scales the application down,
// for the case of smaller screens
function calibrateFontSize() {
    const root = document.getElementsByTagName('html')[0];
    const rootStyle = window.getComputedStyle(root);
    const remRatio = 860 / parseInt(rootStyle.getPropertyValue('font-size').slice(0, -2));
    const height = parseInt(rootStyle.getPropertyValue('height').slice(0, -2));

    root.style.setProperty("font-size", (height / remRatio).toString() + "px");
}