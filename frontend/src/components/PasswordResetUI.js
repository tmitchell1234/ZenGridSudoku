import React from 'react'
import Background from "./Background";
import "../css/forget-password.css";
import PasswordReset from './PasswordReset.js';
import LandingTitle from './LandingTitle.js';

export default function PasswordResetUI() {
  return (
    <div className="forget-pass-UI">
      <Background />
      <LandingTitle />
      <PasswordReset/>
    </div>
  )
}
