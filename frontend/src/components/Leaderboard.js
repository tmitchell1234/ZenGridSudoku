import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

import { useState } from "react";

export default function Leaderboard() {
  const [color, setColor] = useState("rgb(24, 88, 0)");
  const [buttonList, setButtonList] = useState([]);
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const [leaderboardList, setLeaderboardList] = useState([]);
  const darkGreen = "rgb(24, 88, 0)";
  const lightGreen = "rgba(55, 138, 25, 0.9)";
  const darkYellow = "#9C8D00"; //sets the medium color
  const lightYellow = "rgba(220, 204, 54,0.9)";
  const darkRed = "#660000"; //sets the red color
  const lightRed = "rgba(206, 52, 52,0.9)";

  useEffect(() => {
    const buttonList = [];

    for (let number = 1; number <= 50; number++) {
      if (number != level) {
        buttonList.push(
          <Button
            name={number}
            style={{ backgroundColor: color, borderColor: color }}
            key={number}
            onClick={(event) => setLevel(Number(event.target.name))}
          >
            {number}
          </Button>
        );
      } else {
        buttonList.push(
          <Button
            name={number}
            style={{ backgroundColor: color, border: "2px solid white" }}
            key={number}
            onClick={(event) => setLevel(Number(event.target.name))}
          >
            {number}
          </Button>
        );
      }
    }
    setButtonList([...buttonList]);
    scrollColor(difficulty);
  }, [color, level]);

  const handleButtonLevel = (event) => {
    const id_name = event.target.id;
    scrollColor(id_name);
  };

  const scrollColor = (setting) => {
    if (setting === "easy") {
      setColor("rgb(24, 88, 0)");
      setDifficulty("easy");
      document.documentElement.style.setProperty(
        "--scroll-background-color",
        lightGreen
      );
      document.documentElement.style.setProperty(
        "--scroll-thumb-color",
        darkGreen
      );
    } else if (setting === "medium") {
      setColor(darkYellow);
      document.documentElement.style.setProperty(
        "--scroll-background-color",
        lightYellow
      );
      document.documentElement.style.setProperty(
        "--scroll-thumb-color",
        darkYellow
      );
      setDifficulty("medium");
    } else if (setting === "hard") {
      setColor(darkRed);
      setDifficulty("hard");
      document.documentElement.style.setProperty(
        "--scroll-background-color",
        lightRed
      );
      document.documentElement.style.setProperty(
        "--scroll-thumb-color",
        darkRed
      );
    }
  };

  const formatSecondsToHourMinute = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    // const url = `http://localhost:5000/api/getleaderboard_${difficulty}`;
    const url = `https://sudokuapp-f0e20225784a.herokuapp.com/api/getleaderboard_${difficulty}`;

    const request = {
      puzzle_number: level,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request),

      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.Users) {
          let array = [];
       

          array = res.Users.map((item) => {
            return { username: item.username, time: item.time };
          });
          setLeaderboardList(array);
        } else {
          setLeaderboardList([]);
        }
      })
      .catch((error) => alert(error));
  }, [level, difficulty]);

  return (
    <>
      <div className="btn-section">
        <Button id="easy" onClick={handleButtonLevel}>
          Easy
        </Button>
        <Button
          id="medium"
          style={{ backgroundColor: darkYellow, borderColor: darkYellow }}
          onClick={handleButtonLevel}
        >
          Medium
        </Button>
        <Button
          id="hard"
          style={{ backgroundColor: darkRed, borderColor: darkRed }}
          onClick={handleButtonLevel}
        >
          Hard
        </Button>
      </div>

      <div className="level-section" id="scroll">
        {buttonList}
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardList.map((item, i) => {
              return (
                <tr>
                  <td>{item.username}</td>
                  <td>{formatSecondsToHourMinute(item.time)}</td>
                </tr>
              );
            })}

            {leaderboardList.length ==0 &&  <td colSpan={2} rowSpan={1} className="empty-message">
            <div className="text">Set a new record today! </div>
            </td>
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
