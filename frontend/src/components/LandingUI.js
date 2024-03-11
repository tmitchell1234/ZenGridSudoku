import React from 'react';
import '../App.css';
import Background from './Background';
import LeftPane from './LeftPane';
import MiddlePane from './MiddlePane';
import RightPane from './RightPane';

function LandingUI()
{
	return(
        <div className = "Landing-UI">
            <Background />
            <LeftPane />
            <MiddlePane />
            <RightPane />
        </div>
    )
};

export default LandingUI;