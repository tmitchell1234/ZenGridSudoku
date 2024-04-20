import React from "react";
import LeftPane from "./LeftPane";

import RightPane from "./RightPane";
import Background from "./Background";
import LandingTitle from "./LandingTitle";
import "../css/about-us.css";
import Tom from "../images/tom.jpg"
import Logan from "../images/logan.jpg"
import Hagen from "../images/hagen.png"
import placeholder from "../images/placeholder.jpg"
import Ingrid from "../images/ingrid.jpg"
export default function AboutUsUI() {
  return (
    <div className="AboutUs-UI">
      <Background />

      <LeftPane className="LeftPane" />
      <div className="Middle-pane">
        <LandingTitle />
        <div className="title">Meet the Developers</div>

        <div className="about-us-section">
          <div className="about-card">
            <div className="sub-title">Thomas Mitchell</div>
            <div className="sub-text">Project Manager </div>
            <img src={Tom} alt="" />
            
          </div>
          <div className="about-card logan">
            <div className="sub-title">Logan Witte</div>
            <div className="sub-text">Frontend</div>
            <img src={Logan} alt="" />

          </div>
          <div className="about-card ingrid">
            <div className="sub-title">Ingrid Lucas</div>
            <div className="sub-text">Frontend</div>
            <img src={Ingrid} alt="" />

          </div>
          <div className="about-card jeffrey">
            <div className="sub-title">Jeffrey Chang</div>
            <div className="sub-text">Backend</div>
            <img src={placeholder} alt="" />

          </div>
          <div className="about-card hagen">
            <div className="sub-title">Hagen Farrell</div>
            <div className="sub-text">Mobile</div>
            <img src={Hagen} alt="" />

          </div>
          <div className="about-card">
            <div className="sub-title">Matthew Santos</div>
            <div className="sub-text">Mobile</div>
            <img src={placeholder} alt="" />

          </div>


        </div>
      </div>
      <RightPane className="RightPane" />
    </div>
  );
}
