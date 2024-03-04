import React from 'react';
import '../App.css';
import LandingButton from './LandingButton';

function LeftPane()
{
	return(
        <div className="Sidebar" style={{width: '10%'}}>
            <LandingButton text="Play" />
            <LandingButton text="Create Account" />
            <LandingButton text="Sign In" />
            <LandingButton text="About" />
            <LandingButton text="Settings" />
        </div>
    )
};

export default LeftPane;