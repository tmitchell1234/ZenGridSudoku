import React from 'react';
import '../App.css';
function LandingButton({text, do_on_click})
{
    const handleClick = () => {
        do_on_click();
    }

	return(
        <button className="Landing-button" onClick= {handleClick} >
            {text}
        </button>
    )
};

export default LandingButton;