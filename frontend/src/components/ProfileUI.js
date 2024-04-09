import React from "react";
import LeftPane from "./LeftPane";
import MiddlePane from "./MiddlePane";
import RightPane from "./RightPane";
import Background from "./Background";
import LandingTitle from "./LandingTitle";
import Profile from "./Profile";
import "../css/profile.css";

export default function ProfileUI() {
  return (
    <div className="Profile-UI">
      <Background />

      <LeftPane className="LeftPane" />
      <div className="Middle-pane">
        <LandingTitle />
        <Profile className="Profile"></Profile>
      </div>
      <RightPane className="RightPane" />
    </div>
  );
}
