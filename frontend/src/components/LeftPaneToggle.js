import React from 'react';
import arrow from '../images/arrow.png';

function LeftPaneToggle()
{
	return(
            <button className="LeftPaneToggle">
                <img src={arrow} alt='Close' style={{width: '90%', height: '50%', rotate: '180deg'}}/>
            </button>
    )
};

export default LeftPaneToggle;
