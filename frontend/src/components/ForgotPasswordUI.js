import React from 'react'
import Background from "./Background";
import "../css/forget-password.css";
import ForgotPassword from './ForgotPassword.js';
import LandingTitle from './LandingTitle.js';
export default function ForgotPasswordUI() {
  return (
    <div className="forget-pass-UI">
      <Background />
      <LandingTitle />
      <ForgotPassword/>
    </div>
  )
}
