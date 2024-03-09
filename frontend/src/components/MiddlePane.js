import React, { useRef, useEffect, cloneElement } from 'react';
import '../App.css';
import logo from '../images/logo.png';
import SudokuBoard from './SudokuBoard.js';
import SudokuMenu from './SudokuMenu.js';

function MiddlePane()
{
    // EXPERIMENTAL - getting puzzle data and populating table.
    // Put this somewhere else when we refine this functionality.

    // the string of the puzzle is now stored in puzzleString.
    // loop through each cell of the grid and populate it with puzzle data.

    // useEffect() instructs React to run this code after it has rendered all objects in the DOM
    useEffect(() => {
        console.log("printing from inside useEffect()");

        // get all sudoku grid cells and update them
        const allCells = document.querySelectorAll('td');


        /*
            Note to self:
            We need to make the API request inside here. When I had it separated,
            this script was running the code in useEffect() first and then sending the API
            request, meaning puzzleString was undefined when trying to access it
            inside this useEffect() block.
        */

        // send request to API to get easy puzzle 1:
        const data = {
            puzzlenumber: 1
        };

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        let url = 'http://localhost:5000/api/getpuzzle_easy';

        var puzzleString;

        fetch(url, request)
        .then(response => response.json() )
        .then(json => {
            puzzleString = json.puzzlestring;
            console.log("puzzleString = " + puzzleString);

            // now that we have puzzleString, populate the table with given data
            for (var i = 0; i < 81; i++)
            {
                if (puzzleString.charAt(i) != "0")
                {
                    allCells[i].textContent = puzzleString.charAt(i);

                    // apply new class to make cell gray and not respond to clicks
                    allCells[i].classList.add('uneditable');
                }
            }
        });
    }, []); // empty dependency array

    // handle sudoku board logic and updating numbers
    var selectedCell;

    const insertNumber = (number) => {
        // check if there is a selectedCell
        if (selectedCell != null)
            selectedCell.textContent = number;
        else
            alert("No currently selected cell!");
    };

    const selectCell = (event) => {
        //alert("cellId = " + event.target.dataset.cellId);

        // if there was a previously selected cell, un-highlight it:
        if (selectedCell != null)
            selectedCell.style.backgroundColor = "#FFFFFF";

        // try to change the highlighting of the cell to light green
        selectedCell = event.target;
        selectedCell.style.backgroundColor = "#B1FFCA";
    };

	return(
        <div className="Middle-pane">
            <div className="Landing-title">
            <img src={logo} alt="Sudoku Logo" style={{width: 'auto', height: 'calc(100% - 20px', margin: '20px'}}/>
            Sudoku
            </div>

            <div className = "SudokuBoard">
                <SudokuBoard handleCellClick={selectCell} />
                <SudokuMenu onButtonClick={insertNumber} />
            </div>
        </div>
    )
};


export default MiddlePane;