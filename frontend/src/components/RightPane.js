import React from "react";
import "../App.css";
import LandingButton from "./LandingButton";
import { useNavigate } from "react-router-dom";
// function LoginLayout() {

function RightPane() {
  let navigate = useNavigate();
  const routeChange = (path) => {

    navigate(path);
  };

  return (
    <div
      className="Sidebar"
      style={{ width: "20%", borderLeft: "1px solid black" }}
    >
      <LandingButton text="🧩 Solve Puzzle" set_path="/"   />
      <LandingButton text="📅 Daily Puzzle" set_path="/" />
      <LandingButton text="🤝 Head to Head" set_path="/" />
      <LandingButton text="🏆 Tournaments" set_path="/" />
      <LandingButton text="🥇 Leaderboard" set_path="/"  />
    </div>
  );
}

export default RightPane;
