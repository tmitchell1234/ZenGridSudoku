import React from "react";
import Background from "./Background";
//import Login from "./Login";
import Verify from "./Verify"

import LandingTitle from './LandingTitle.js';

export default function VerificationUI()
{
    return (
        <div className="Login-UI">
            <Background />
            <LandingTitle />
            <Verify/>
    </div>
    )
}