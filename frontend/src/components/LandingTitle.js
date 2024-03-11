import React from 'react';
import '../App.css';
import logo from '../images/logo.png';
import { useNavigate } from "react-router-dom";




function LandingTitle()
{
    let navigate = useNavigate();
    
    const goHome = () => {
        navigate("/");
    };

	return(
        <div className="Landing-title" style={{border: 'none', borderBottom: '1px solid #000000'}}>
            <button onClick={goHome}>
                <img src={logo} alt="Sudoku Logo" style={{width: 'auto', height: 'calc(100% - 20px)', margin: '20px'}}/>
                Sudoku
            </button>
        </div>
    )
};

export default LandingTitle;