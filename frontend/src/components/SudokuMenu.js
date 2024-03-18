import React from 'react';

import '../css/SudokuMenu.css';
import '../App.css';

function SudokuMenu( {onButtonClick} )
{
    return(
        <div class="Menu">
            <div class="Title">Select Number</div>
            <div class="MenuTable">
                <div class="number 1" onClick={() => onButtonClick(1)}>1</div>
                <div class="number 2" onClick={() => onButtonClick(2)}>2</div>
                <div class="number 3" onClick={() => onButtonClick(3)}>3</div>
                <div class="number 4" onClick={() => onButtonClick(4)}>4</div>
                <div class="number 5" onClick={() => onButtonClick(5)}>5</div>
                <div class="number 6" onClick={() => onButtonClick(6)}>6</div>
                <div class="number 7" onClick={() => onButtonClick(7)}>7</div>
                <div class="number 8" onClick={() => onButtonClick(8)}>8</div>
                <div class="number 9" onClick={() => onButtonClick(9)}>9</div>
                <div class="number 10" onClick={() => onButtonClick(10)}>X</div>
            </div>
        </div>
    ); // the last number 10 button will be the clear cell button
};

export default SudokuMenu;