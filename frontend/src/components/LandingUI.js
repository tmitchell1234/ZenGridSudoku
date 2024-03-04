import React from 'react';
import '../App.css';
import Background from './Background';
import LeftPane from './LeftPane';
import MiddlePane from './MiddlePane';
import RightPane from './RightPane';
import LeftPaneToggle from './LeftPaneToggle';

function LandingUI()
{
	return(
        <div className = "Landing-UI">
            <Background />
            <LeftPane />
            <LeftPaneToggle />
            <MiddlePane />
            <RightPane />
        </div>
    )
};

export default LandingUI;