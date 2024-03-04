import React from 'react';
import '../App.css';
import logo from '../images/logo.png';

function MiddlePane()
{
	return(
        <div className="Middle-pane">
            
            <div className="Landing-title">
            <img src={logo} style={{width: 'auto', height: 'calc(100% - 20px', margin: '20px'}}/>
            Sudoku
            </div>
            <div style={{width: 'calc(70% - 20px)', height: 'calc(100% - 20px)', backgroundColor: 'white', border: '1px solid #000000', margin: '10px'}}>
                
            </div>
        </div>
    )
};

export default MiddlePane;