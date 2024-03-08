import React from "react";
import "../App.css";
import logo from "../images/logo.png";

function MiddlePane()
{
	return(
        <div className="Middle-pane">
            <div className="Landing-title">
            <img src={logo} alt="Sudoku Logo" style={{width: 'auto', height: 'calc(100% - 20px', margin: '20px'}}/>
            Sudoku
            </div>
            <div className = "SudokuBoard">
                
            </div>
        </div>
    )
};

export default MiddlePane;