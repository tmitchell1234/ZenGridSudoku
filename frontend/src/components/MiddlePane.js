import React, { useRef, useEffect, cloneElement, useState } from 'react';
import '../App.css';
import SudokuBoard from './SudokuBoard.js';
import SudokuMenu from './SudokuMenu.js';
import LandingTitle from './LandingTitle.js';
import WinScreen from './WinScreen.js';
import clock from '../images/clock.png';

// create our internal 9x9 sudoku board for the purposes of validation:
var allCells;
var board = Array.from({ length: 9 }, () => Array(9).fill(0));
var renderCount2 = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let timeMS = 0; // Variable to store time in milliseconds
let intervalId; // Variable to store interval ID
let timeString = "";

function timeMStoString(timeMS) {
    let timeSec = Math.floor(timeMS / 1000);
    timeMS -= 1000 * timeSec;
    let timeMin = Math.floor(timeSec / 60);
    timeSec -= timeMin * 60;
    let timeHour = Math.floor(timeMin / 60);
    timeMin -= timeHour * 60;
    if(timeHour > 0) {
        return String(timeHour) + ":" + String(timeMin).padStart(2, '0') + ":" + String(timeSec).padStart(2, '0') + "." + String(timeMS).slice(0,2);
    }
    else if(timeMin > 0) {
        return String(timeMin) + ":" + String(timeSec).padStart(2, '0') + "." + String(timeMS).slice(0,2);
    }
    else if(timeSec > 0) {
        return String(timeSec) + "." + String(timeMS).charAt(0);
    }
    else {
        return "0." + String(timeMS).charAt(0);
    }
    
}

// Function to start the timer
function startTimer() {
    timeMS = 0;
  intervalId = setInterval(() => {
    timeMS += 100; // Increment time by 100 milliseconds
    timeString = timeMStoString(timeMS);
    document.getElementById("clockText").innerHTML = timeString;
  }, 100); // Update every 100 milliseconds
}

// Function to stop the timer
function endTimer() {
  clearInterval(intervalId);
}


function createBoard(difficulty, number) {
    endTimer();
    startTimer();
    
    // get all sudoku grid cells and update them
    allCells = document.querySelectorAll('td');

    /*
        Note to self:
        We need to make the API request inside here. When I had it separated,
        this script was running the code in useEffect() first and then sending the API
        request, meaning puzzleString was undefined when trying to access it
        inside this useEffect() block.
    */

    if(number == 0) {
        number = getRandomInt(1,50);
    }
    const data = {
        puzzle_number: number
    };
    

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    let jsonSample = {
        json1: "easy",
        json2: "medium",
        json3: "hard",
        json4: "devtest"
    };

    // let url = 'http://localhost:5000/api/getpuzzle_devtest';
    // let url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_easy';
    let url;
    if(difficulty == jsonSample.json1) {
        url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_easy';
    }
    else if(difficulty == jsonSample.json2) {
        url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_medium';
    }
    else if(difficulty == jsonSample.json3) {
        url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_hard';
    }
    else if(difficulty == jsonSample.json4) {
        url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_devtest';
    }
    else {
        url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_easy';
    }
    

    var puzzleString;

    fetch(url, request)
        .then(response => response.json())
        .then(json => {
            puzzleString = json.puzzlestring;
            //console.log("puzzleString = " + puzzleString);

            // now that we have puzzleString, populate the table with given data
            for (var i = 0; i < 81; i++) {
                if (puzzleString.charAt(i) != "0") {
                    allCells[i].textContent = puzzleString.charAt(i);

                    // apply new class to make cell gray and not respond to clicks
                    allCells[i].classList.add('uneditable');
                    allCells[i].style.backgroundColor = "#aaa"

                    // add that cell's number to the internal board for validation purposes.
                    // first, get it's integer coordinates:
                    var y_index = allCells[i].dataset.cellId[0];
                    var x_index = allCells[i].dataset.cellId[1];

                    var givenNum = parseInt(puzzleString.charAt(i));

                    //console.log("Saving given number " + givenNum + " at coordinates [" + y_index + "][" + x_index + "]" );
                    board[y_index][x_index] = givenNum;
                }
                else {
                    allCells[i].textContent = "";
                    allCells[i].classList.remove('uneditable');
                    var y_index = allCells[i].dataset.cellId[0];
                    var x_index = allCells[i].dataset.cellId[1];
                    var givenNum = 0;
                    board[y_index][x_index] = givenNum;
                }
            }
        });
}



function MiddlePane({ puzzleData }) {
    const isFirstRender1 = useRef(true);
    let logged_in;
    if(localStorage && localStorage.getItem("user_data")) {
        logged_in = true;
    }
    else {
        logged_in = false;
    }
    
    // EXPERIMENTAL - getting puzzle data and populating table.
    // Put this somewhere else when we refine this functionality.

    // the string of the puzzle is stored in puzzleString.
    // loop through each cell of the grid and populate it with puzzle data.

    

    // useEffect() instructs React to run this code after it has rendered all objects in the DOM

    // isFirstRender stops it from running twice on page start but doesnt work right on live server??? idk
    useEffect(() => {
        
        //CODE FOR LOCAL SERVER (Comment out when pushing)
        /*
        if(isFirstRender1.current) {
            isFirstRender1.current = false;
            //This resets renderCount2 every time the page is loaded
            //Fixes issue with page redirection causing a api crash or something idk this code is confusing
            renderCount2 = 0; 
            return;
        }
        else {
            createBoard("easy", 0);
        }
        */
        
        


        //CODE FOR LIVE SERVER (Comment out when running locally)
        
        renderCount2 = 0; 
        createBoard("easy", 0);
        
        

        
        
    }, []); // empty dependency array

    const [puzzleCompleted, setPuzzleCompleted] = useState(false);

    const logTime = async (inputData, inputURL) => {
        //console.log("logTime: \nURL: " + inputURL + "\nData: " + JSON.stringify(inputData));
        try {
            const response = await fetch(
                inputURL,
                {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: { "Content-Type": "application/json" },
                }
            );
            let res = JSON.parse(await response.text());
            if (res.message) 
                alert(res.message);
        }
        catch (e) {
            alert("Logging time failed! Check console.");
            console.log(e);
        }
    }

    function winEffects() {
        endTimer();
        setPuzzleCompleted(true);

        if(localStorage && localStorage.getItem("user_data")) {
            let difficulty = puzzleData.difficulty;
            let jsonDifficulties = {
                t1: "easy",
                t2: "medium",
                t3: "hard",
                t4: "devtest"
            }
            let url;
            let data;
            if(difficulty == jsonDifficulties.t1) {
                url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/setusertime_easy';
                data = {
                    //username: localStorage.getItem("user_data").username,
                    username: JSON.parse(localStorage.getItem("user_data")).username,
                    puzzle_number: puzzleData.number,
                    time_easy: timeMS
                };
            }
            else if(difficulty == jsonDifficulties.t2) {
                url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/setusertime_medium';
                data = {
                    //username: localStorage.getItem("user_data").username,
                    username: JSON.parse(localStorage.getItem("user_data")).username,
                    puzzle_number: puzzleData.number,
                    time_medium: timeMS
                };
            }
            else if(difficulty == jsonDifficulties.t3) {
                url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/setusertime_hard';
                data = {
                    //username: localStorage.getItem("user_data").username,
                    username: JSON.parse(localStorage.getItem("user_data")).username,
                    puzzle_number: puzzleData.number,
                    time_hard: timeMS
                };
            }
            else if(difficulty == jsonDifficulties.t4) {
                url = 'https://sudokuapp-f0e20225784a.herokuapp.com/api/setusertime_medium';
                data = {
                    //username: localStorage.getItem("user_data").username,
                    username: JSON.parse(localStorage.getItem("user_data")).username,
                    puzzle_number: puzzleData.number,
                    time_medium: timeMS
                };
            }
            else {
                console.log("Invalid difficulty (something is wrong)");
            }
            logTime(data, url);
        }
    }

    useEffect(() => {
    }, [puzzleCompleted]);



    // handle sudoku board logic and updating numbers
    var selectedCell;
    
    // called when clicking on the number menu buttons
    const insertNumber = (number) => {
        // check if there is a selectedCell
        if (selectedCell != null) {
            // only insert a number if the selected cell is not a given number.
            // this is the case if the classList contains the tag "uneditable".
            if (!selectedCell.classList.contains("uneditable")) {
                // get the y and x indices of the cell coordinate to add to internal validation board.
                var y_index = selectedCell.dataset.cellId[0];
                var x_index = selectedCell.dataset.cellId[1];

                // button with number 10 is the X button, which means clear the cell of text content
                if (number == 10) {
                    // un-highlight all other cells with the same number, then clear the cell of the number.
                    unHighlightAll(selectedCell.textContent);
                    selectedCell.textContent = "";

                    board[y_index][x_index] = 0;
                }

                else {
                    // if changing number on the same cell, unhighlight all previously selected cells
                    unHighlightAll(selectedCell.textContent);

                    // then, change the number, and highlight all other like numbers
                    selectedCell.textContent = number;
                    highlightAll(number);

                    board[y_index][x_index] = parseInt(number);

                    // make call to validation function whenever number is inserted:
                    if (isValidSudoku()) {
                        //console.log("Board is valid!");

                        // now check if board is filled.
                        // in which case, notify user they solved the board.

                        if (boardIsFilled()) {
                            //console.log("Congrats, you solved the puzzle!");
                            winEffects();
                        }
                           
                    }

                    else {
                        //console.log("Board has mistakes!");
                    }
                }

            }
        }
        else
            alert("No currently selected cell!");
    };

    function highlightAll(number) {
        for (var i = 0; i < 81; i++)
            if (allCells[i].textContent == selectedCell.textContent) {
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

    function unHighlightAll(number) {
        for (var i = 0; i < 81; i++) {
            if (allCells[i].textContent == number) {
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

    function resetBoard() {
        //Resets highlighted cells and stuff
        for (let i = 0; i < 81; i++) {
            allCells[i].classList.remove('uneditable');
            allCells[i].textContent = "";
            allCells[i].style.backgroundColor = "#FFFFFF";
        }
    }


    // called when clicking on a cell on the grid
    const selectCell = (event) => {

        // if there was a previously selected cell, un-highlight it:
        if (selectedCell != null) {
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

    function boardIsFilled() {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                if (board[i][j] == 0) return false;
        return true;
    }

    function isValidSudoku() {
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

    function isValidSet(arr) {
        var seen = new Set();
        for (let num of arr) {
            if (num !== 0) // ignore empty cells
            {
                if (seen.has(num)) return false;
                seen.add(num);
            }
        }
        return true;
    }

    function getColumn(colIndex) {
        var column = [];
        for (let i = 0; i < 9; i++)
            column.push(board[i][colIndex]);
        return column;
    }

    function getSubgrid(rowStart, colStart) {
        var subgrid = [];
        for (let i = rowStart * 3; i < rowStart * 3 + 3; i++)
            for (let j = colStart * 3; j < colStart * 3 + 3; j++)
                subgrid.push(board[i][j]);
        return subgrid;
    }

    useEffect(() => {
        

        //renderCount is weird, seems like it renders once on page start but twice on local machine???

        //CODE FOR LOCAL SERVER (Comment out when pushing)
        /*
        renderCount2 ++;
        if(renderCount2 <= 2) {
            return;
        }
        */
        
        
        
        

        //CODE FOR LIVE SERVER (Comment out when testing)
        
        renderCount2 ++;
        if(renderCount2 <= 1) {
            return;
        }
        
        
        
        
        

        //console.log("createBoard(" + JSON.stringify(puzzleData.difficulty) + ", " + JSON.stringify(puzzleData.number) + ");");
        resetBoard();
        //unHighlightAll();
        createBoard(puzzleData.difficulty, parseInt(puzzleData.number));
        
    }, [puzzleData]);

    //HTML STUFF HERE
    return (
        <div className="Middle-pane">
            {puzzleCompleted === true ? <WinScreen time_taken={timeString} logged_in={logged_in}/> : null}
            <LandingTitle />
            <div className="clockContainer">
                <img src={clock}></img>
                <div className="clockText" id="clockText">0:00.0</div>
            </div>
            <div className="SudokuBoard">
                <SudokuBoard handleCellClick={selectCell} />
                <SudokuMenu onButtonClick={insertNumber} />
            </div>
        </div>
    )
    
};


export default MiddlePane;