import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

import { useState } from "react";

export default function Leaderboard() {

  const [color, setColor] = useState("rgb(24, 88, 0)");
  const [list, setList] = useState([]);
  const [level, setLevel] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const darkGreen= "rgb(24, 88, 0)";
  const lightGreen = "rgba(55, 138, 25, 0.9)";
  const darkYellow = "#9C8D00"; //sets the medium color
  const lightYellow ="rgba(220, 204, 54,0.9)";
  const darkRed = "#660000"; //sets the red color
  const lightRed = "rgba(206, 52, 52,0.9)";

  useEffect(() => {
    const list = [];
    for (let number = 1; number <= 50; number++) {
      list.push(
        <Button
          name={number}
          style={{ backgroundColor: color, borderColor: color }}
        >
          {number}
        </Button>
      );
    }
    setList([...list]);
  }, [color]);

  const handleButtonLevel = (event) => {
    const id_name = event.target.id;
    if (id_name === "easy") {
      setColor("rgb(24, 88, 0)");
      setDifficulty("easy");
      document.documentElement.style.setProperty("--scroll-background-color", lightGreen);
      document.documentElement.style.setProperty("--scroll-thumb-color", darkGreen);

    } else if (id_name === "medium") {
      setColor(darkYellow);
      document.documentElement.style.setProperty("--scroll-background-color", lightYellow);
      document.documentElement.style.setProperty("--scroll-thumb-color", darkYellow);
      setDifficulty("medium");
    } else if (id_name === "hard") {
      setColor(darkRed);
      setDifficulty("hard");
      document.documentElement.style.setProperty("--scroll-background-color", lightRed);
      document.documentElement.style.setProperty("--scroll-thumb-color", darkRed);
      
    }
  };

 // api does not return appropriate response
 
  // useEffect(()=> async () => {
  //   const url = `http://localhost:5000/api/getleaderboard_${difficulty}`;
  //   // `https://sudokuapp-f0e20225784a.herokuapp.com/api/getleaderboard_${difficulty}`
  //   console.log(url);
  //   try {
  //     const response = await fetch(
  //       url
  //       ,
  //       {
  //         method: "GET",
  //         mode: "cors"
  //       }
  //     );

  //     let res = await response.text();
   
  //   }
  //   catch (e)
  //   {
    
  //     alert(e);
  //   }
  
  // }, [difficulty]);


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
        {list}
      </div>
    </>
  );
}
