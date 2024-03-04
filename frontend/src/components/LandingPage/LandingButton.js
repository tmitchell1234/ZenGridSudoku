import React from 'react';
import '../App.css';

function LandingButton({text})
{
	return(
        <button className="Landing-button">
            {text}
        </button>
    )
};

export default LandingButton;