import React from "react";
import Background from "./Background";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
import Leaderboard from "./Leaderboard";
import LandingTitle from "./LandingTitle";
export default function LeaderboardUI() {
  return (
    <div className="Leaderboard-UI">
      <Background />

      <LeftPane className ="LeftPane"/>
      <div className="Middle-pane">
        <LandingTitle/>
       <Leaderboard className = "Leaderboard"/>
       </div>
      <RightPane className= "RightPane"/>
    </div>
  );
}
