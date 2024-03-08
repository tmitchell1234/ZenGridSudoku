import Background from "./Background";
import Login from "./Login";
import React from "react";
import logo from "../images/logo.png";

export default function LoginUI() {
  return (
    <div className="Login-UI">
      <Background />
      <div className="Landing-title">
        <img
          src={logo}
          style={{ width: "auto", height: "calc(100% - 20px", margin: "20px" }}
        />
        Sudoku
      </div>
      <Login/>

    </div>
  );
}
