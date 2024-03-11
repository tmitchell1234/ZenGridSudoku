import Background from "./Background";
import Login from "./Login";
import React from "react";
import LandingTitle from './LandingTitle.js';

export default function LoginUI() {
  return (
    <div className="Login-UI">
      <Background />
      <LandingTitle />
      <Login/>
    </div>
  );
}
