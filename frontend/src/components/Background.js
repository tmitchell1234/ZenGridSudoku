import React from 'react';
import backgroundImage from '../images/background.jpg';
import '../App.css';

function Background()
{
	return(
        <div className="Background">
            <img src= {backgroundImage} alt="Background image of a forest" style={{width: '100%', height: '100%'}}></img>
        </div>
    )
};

export default Background;