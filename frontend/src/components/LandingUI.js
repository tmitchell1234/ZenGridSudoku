import React, { useState } from 'react';
import '../App.css';
import Background from './Background';
import LeftPane from './LeftPane';
import MiddlePane from './MiddlePane';
import RightPane from './RightPane';

function LandingUI()
{
    const [puzzleData, setPuzzleData] = useState('');

    const updatePuzzleData = (input) => {
        setPuzzleData(input);
    };

	return(
        <div className = "Landing-UI">
            <Background />
            <LeftPane />
            <MiddlePane puzzleData={puzzleData}/>
            <RightPane updatePuzzleData={updatePuzzleData}/>
        </div>
    )
};

export default LandingUI;