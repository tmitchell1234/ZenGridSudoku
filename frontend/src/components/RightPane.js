import React, { useState } from "react";
import "../App.css";
import LandingButton from "./LandingButton";
import { useNavigate } from "react-router-dom";

var puzzleDifficulty = "none";
var puzzleNumberType = "none";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RightPane({ updatePuzzleData }) {
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const [isSelectPuzzleClicked, setIsSelectPuzzleClicked] = useState(false);

  function selectPuzzle() {
    setIsSelectPuzzleClicked((prevValue) => !prevValue);
  }

  function setDifficulty(difficulty) {
    if (difficulty == "easy") {
      puzzleDifficulty = "easy";
      document.getElementById("easyButton").style.background = "#80c452";
      document.getElementById("mediumButton").style.background = "#ABE188";
      document.getElementById("hardButton").style.background = "#ABE188";
    } else if (difficulty == "medium") {
      puzzleDifficulty = "medium";
      document.getElementById("easyButton").style.background = "#ABE188";
      document.getElementById("mediumButton").style.background = "#80c452";
      document.getElementById("hardButton").style.background = "#ABE188";
    } else if (difficulty == "hard") {
      puzzleDifficulty = "hard";
      document.getElementById("easyButton").style.background = "#ABE188";
      document.getElementById("mediumButton").style.background = "#ABE188";
      document.getElementById("hardButton").style.background = "#80c452";
    } else {
      console.log("invalid difficulty (how did we get here?)");
    }
  }

  function setPuzzleNumber(numberType) {
    if (numberType == "custom") {
      puzzleNumberType = "custom";
      document.getElementById("customButton").style.background = "#80c452";
      document.getElementById("randomButton").style.background = "#ABE188";
    } else if (numberType == "random") {
      puzzleNumberType = "random";
      document.getElementById("customButton").style.background = "#ABE188";
      document.getElementById("randomButton").style.background = "#80c452";
    }
  }

  function startPuzzle() {
    let puzzleData;
    let ret = false;
    let puzzleNumber = "";
    let errorText = "";
    let errorArea = document.getElementById("puzzleSelectError");
    errorArea.innerHTML = "";
    errorArea.style.display = "none";

    if (puzzleNumberType == "custom") {
      puzzleNumber = document.getElementById("puzzleNumberInput").value;
    } else if (puzzleNumberType == "random") {
      puzzleNumber = getRandomInt(1, 50).toString();
    }

    if (puzzleDifficulty == "none") {
      errorText += "No difficulty selected!<br>";
      ret = true;
    }
    if (puzzleNumber == "") {
      errorText += "No puzzle number selected!<br>";
      ret = true;
    } else {
      const regexNumerical = /^[0-9]+$/;
      if (!regexNumerical.test(puzzleNumber)) {
        errorText += "Puzzle number must be numerical!<br>";
        ret = true;
      } else if ((parseInt(puzzleNumber) > 50) | (parseInt(puzzleNumber) < 1)) {
        errorText += "Puzzle number must be between 1 and 50!<br>";
        ret = true;
      }
    }

    if (ret == false) {
      console.log("proceeding to start puzzle");
      let puzzleData = {
        difficulty: puzzleDifficulty,
        number: puzzleNumber,
      };
      localStorage.setItem("puzzle_data", JSON.stringify(puzzleData));
      console.log(JSON.stringify(puzzleData));
      updatePuzzleData(puzzleData);
    } else {
      errorArea.innerHTML = errorText;
      errorArea.style.display = "flex";
    }
  }

  if (!isSelectPuzzleClicked) {
    return (
      <div
        className="Sidebar"
        
      >
        <LandingButton text="🧩 Select Puzzle" do_on_click={selectPuzzle} />
        <LandingButton
          text="📅 Daily Puzzle"
          do_on_click={() => routeChange("/")}
        />
        <LandingButton
          text="🏆 Tournaments"
          do_on_click={() => routeChange("/")}
        />
        <LandingButton
          text="🥇 Leaderboard"
          do_on_click={() => routeChange("/leaderboardpage")}
        />
      </div>
    );
  } else {
    return (
      <div
        className="Sidebar"
        style={{ width: "20%", borderLeft: "1px solid black" }}
      >
        <div className="selectPuzzles">
          <button className="Landing-button" onClick={selectPuzzle}>
            🧩 Select Puzzle
          </button>
          <div className="selectPuzzleCategory">
            <div>Difficulty:</div>

            <div className="rowAlign">
              <button
                id="easyButton"
                className="selectPuzzleDifficulty"
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>
              <button
                id="mediumButton"
                className="selectPuzzleDifficulty"
                onClick={() => setDifficulty("medium")}
              >
                Medium
              </button>
              <button
                id="hardButton"
                className="selectPuzzleDifficulty"
                onClick={() => setDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          </div>

          <div className="selectPuzzleCategory">
            <div>Puzzle Number:</div>
            <div className="rowAlign">
              <button
                className="selectPuzzleDifficulty"
                id="customButton"
                onClick={() => setPuzzleNumber("custom")}
              >
                Custom:
                <input
                  type="text"
                  id="puzzleNumberInput"
                  className="puzzleNumberInput"
                ></input>
              </button>

              <button
                className="selectPuzzleDifficulty"
                id="randomButton"
                onClick={() => setPuzzleNumber("random")}
              >
                Random
              </button>
            </div>
          </div>

          <button
            className="Landing-button"
            onClick={startPuzzle}
            style={{ width: "auto", padding: "0px 10px 0px 10px" }}
          >
            Start Puzzle!
          </button>
          <div
            id="puzzleSelectError"
            className="selectPuzzleError"
            style={{ display: "none" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default RightPane;
