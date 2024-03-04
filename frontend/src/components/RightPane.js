import React from 'react';
import '../App.css';
import LandingButton from './LandingButton';

function RightPane()
{
	return(
        <div className="Sidebar" style={{width: '20%', borderLeft: '1px solid black'}}>
            <LandingButton text="🧩 Solve Puzzle" />
            <LandingButton text="📅 Daily Puzzle" />
            <LandingButton text="🤝 Head to Head" />
            <LandingButton text="🏆 Tournaments" />
            <LandingButton text="🥇 Leaderboard" />
        </div>
    )
};

export default RightPane;