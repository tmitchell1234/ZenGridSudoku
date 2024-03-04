import React from 'react';
import '../App.css';
import LandingButton from './LandingButton';

function RightPane()
{
	return(
        <div className="Sidebar" style={{width: '576px'}}>
            <LandingButton text="Solve Puzzle" />
            <LandingButton text="Daily Puzzle" />
            <LandingButton text="Head to Head" />
            <LandingButton text="Tournaments" />
            <LandingButton text="Leaderboard" />
        </div>
    )
};

export default RightPane;