import React from 'react';
import arrow from '../images/arrow.png';

function LeftPaneToggle()
{
	return(
            <button className="LeftPaneToggle">
                <img src={arrow} alt='Close' style={{width: '1.2vw', height: '3vh', rotate: '180deg',}}/>
            </button>
    )
};

export default LeftPaneToggle;
