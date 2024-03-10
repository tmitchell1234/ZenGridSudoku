import React from 'react';
import '../App.css';
import LandingButton from './LandingButton';


function LeftPane()
{


	return(
        <div className="Sidebar" style={{width: '15%', borderRight: '1px solid black'} }>
            <LandingButton text="🎮 Play" set_path="/" />
            <LandingButton text="📝 Create Account" set_path = "/signuppage" />
            <LandingButton text="🔑 Sign In" set_path= "/loginpage"/>
            <LandingButton text="📘 About" set_path="/" />
            <LandingButton text="⚙️ Settings" set_path="/"/>
        </div>
    )
};

export default LeftPane;