import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
function LandingButton({text, set_path})
{
    let navigate = useNavigate();
    
    const routeChange = () => {
  
        navigate(set_path);

    };

	return(
        <button className="Landing-button" onClick= {routeChange} >
            {text}
        </button>
    )
};

export default LandingButton;