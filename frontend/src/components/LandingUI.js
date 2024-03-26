import React, { useState } from 'react';
import '../App.css';
import Background from './Background';
import LeftPane from './LeftPane';
import MiddlePane from './MiddlePane';
import RightPane from './RightPane';
import  "../css/leaderboard.css";
function LandingUI()
{
    const [puzzleData, setPuzzleData] = useState('');

    const updatePuzzleData = (input) => {
        setPuzzleData(input);
    };

	return(
        <div className = "Landing-UI">
            <Background />
            <LeftPane className = "LeftPane"/>
            <MiddlePane className="MiddlePane" puzzleData={puzzleData}/>
            <RightPane className= "RightPane" updatePuzzleData={updatePuzzleData}/>
        </div>
    )
};

export default LandingUI;