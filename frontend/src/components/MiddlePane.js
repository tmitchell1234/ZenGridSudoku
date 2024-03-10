import React, { useRef, useEffect, cloneElement } from 'react';
import '../App.css';
import logo from '../images/logo.png';
import SudokuBoard from './SudokuBoard.js';
import SudokuMenu from './SudokuMenu.js';

function MiddlePane()
{
    // EXPERIMENTAL - getting puzzle data and populating table.
    // Put this somewhere else when we refine this functionality.

    // the string of the puzzle is stored in puzzleString.
    // loop through each cell of the grid and populate it with puzzle data.
    var allCells;

    // create our internal 9x9 sudoku board for the purposes of validation:
    var board = Array.from({ length: 9 }, () => Array(9).fill(0));

    // useEffect() instructs React to run this code after it has rendered all objects in the DOM
    useEffect(() => {
        console.log("printing from inside useEffect()");

        // get all sudoku grid cells and update them
        allCells = document.querySelectorAll('td');


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

        // let url = 'http://localhost:5000/api/getpuzzle_devtest';
        let url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_easy';

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

                    // add that cell's number to the internal board for validation purposes.
                    // first, get it's integer coordinates:
                    var y_index = allCells[i].dataset.cellId[0];
                    var x_index = allCells[i].dataset.cellId[1];

                    var givenNum = parseInt(puzzleString.charAt(i));

                    //console.log("Saving given number " + givenNum + " at coordinates [" + y_index + "][" + x_index + "]" );
                    board[y_index][x_index] = givenNum;
                }
            }
        });
    }, []); // empty dependency array





    // handle sudoku board logic and updating numbers
    var selectedCell;

    // called when clicking on the number menu buttons
    const insertNumber = (number) => {
        // check if there is a selectedCell
        if (selectedCell != null)
        {
            // only insert a number if the selected cell is not a given number.
            // this is the case if the classList contains the tag "uneditable".
            if (!selectedCell.classList.contains("uneditable"))
            {
                // get the y and x indices of the cell coordinate to add to internal validation board.
                var y_index = selectedCell.dataset.cellId[0];
                var x_index = selectedCell.dataset.cellId[1];

                // button with number 10 is the X button, which means clear the cell of text content
                if (number == 10)
                {
                    // un-highlight all other cells with the same number, then clear the cell of the number.
                    unHighlightAll(selectedCell.textContent);
                    selectedCell.textContent = "";

                    board[y_index][x_index] = 0;
                }
                
                else
                {
                    // if changing number on the same cell, unhighlight all previously selected cells
                    unHighlightAll(selectedCell.textContent);

                    // then, change the number, and highlight all other like numbers
                    selectedCell.textContent = number;
                    highlightAll(number);

                    board[y_index][x_index] = parseInt(number);

                    // make call to validation function whenever number is inserted:
                    if (isValidSudoku())
                    {
                        console.log("Board is valid!");

                        // now check if board is filled.
                        // in which case, notify user they solved the board.

                        if (boardIsFilled())
                            alert("Congrats, you solved the puzzle!");
                    }
                        
                    else
                        console.log("Board has mistakes!");
                }
                    
            }
        }
        else
            alert("No currently selected cell!");
    };

    function highlightAll(number)
    {
        for (var i = 0; i < 81; i++)
            if (allCells[i].textContent == selectedCell.textContent)
            {
                var thisCell = allCells[i];
                // console.log("Changing cell " + i + " to highlighted");

                // if the cell is a given one, make it darker green to make it more
                // visually apparent that it is given and uneditable.
                if (thisCell.classList.contains("uneditable"))
                    thisCell.style.backgroundColor = "#42A362";
                else
                    thisCell.style.backgroundColor = "#B1FFCA";
            }
    }

    function unHighlightAll(number)
    {
        for (var i = 0; i < 81; i++)
        {
            if (allCells[i].textContent == selectedCell.textContent)
            {
                var thisCell = allCells[i];

                // if the cell was a number given by the puzzle, it will have the 'uneditable' class tag.
                // change it's background color back to dark gray:
                if (thisCell.classList.contains("uneditable"))
                    thisCell.style.backgroundColor = "#aaa";
                else
                    thisCell.style.backgroundColor = "#FFFFFF";
            }
        }
    }


    // called when clicking on a cell on the grid
    const selectCell = (event) => {
        //alert("cellId = " + event.target.dataset.cellId);

        // if there was a previously selected cell, un-highlight it:
        if (selectedCell != null)
        {
            if (!selectedCell.classList.contains("uneditable"))
                selectedCell.style.backgroundColor = "#FFFFFF";

            // loop through all other cells, un-highlight the ones which have the same number

            if (selectedCell.textContent != "")
                unHighlightAll(selectedCell.textContent);
        }

        // change the highlighting of the cell to light green
        selectedCell = event.target; // update to the newly selected cell
        selectedCell.style.backgroundColor = "#B1FFCA";

        // check all other cells, highlight ones which contain the same number as selectedCell
        if (selectedCell.textContent != "")
            highlightAll(selectedCell.textContent);
    };






    // begin section for board validation

    function boardIsFilled()
    {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                if (board[i][j] == 0) return false;
        return true;
    }

    function isValidSudoku()
    {
        // check rows
        for (let i = 0; i < 9; i++)
            if (!isValidSet(board[i])) return false;

        // check columns
        for (let i = 0; i < 9; i++)
            if (!isValidSet(getColumn(i))) return false;
        
        // check 3x3 subgrids
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (!isValidSet(getSubgrid(i, j))) return false;

        // all checks passed and board is valid
        return true;
    }

    function isValidSet(arr)
    {
        var seen = new Set();
        for (let num of arr)
        {
            if (num !== 0) // ignore empty cells
            {
                if (seen.has(num)) return false;
                seen.add(num);
            }
        }
        return true;
    }

    function getColumn(colIndex)
    {
        var column = [];
        for (let i = 0; i < 9; i++)
            column.push(board[i][colIndex]);
        return column;
    }

    function getSubgrid(rowStart, colStart)
    {
        var subgrid = [];
        for (let i = rowStart * 3; i < rowStart * 3 + 3; i++)
            for (let j = colStart * 3; j < colStart * 3 + 3; j++)
                subgrid.push(board[i][j]);
        return subgrid;
    }

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