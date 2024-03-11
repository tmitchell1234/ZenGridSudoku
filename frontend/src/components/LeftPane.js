import React from 'react';
import '../App.css';
import LandingButton from './LandingButton';

let user_data;
let username;
let id;

if(localStorage && localStorage.getItem("user_data")) {
    user_data = JSON.parse(localStorage.getItem("user_data"));
    getData();
    console.log("Data Initialized");
}

function clearData() {
    localStorage.clear();
    window.location.reload();
}

function setData() {
    let user = {
        username: "Test UName",
        id: "Test userID",
      };
    localStorage.setItem("user_data", JSON.stringify(user));
    window.location.reload();
}
function getData() {
    if(user_data) {
        username = user_data.username;
        id = user_data.id;
        console.log("U: " + username + ",id: " + id);
    }
}

function logOut() {
    localStorage.clear();
    window.location.reload();
}

function LeftPane()
{
    if(localStorage && localStorage.getItem("user_data")) {
        return(
            <div className="Sidebar" style={{width: '15%', borderRight: '1px solid black'} }>
                <LandingButton text="🎮 Play" set_path="/" />
                <LandingButton text="📘 About" set_path="/" />
                <LandingButton text="⚙️ Settings" set_path="/"/>
                <button className="Landing-button" onClick={logOut}>🔓 Log Out</button>
                <div style={{marginTop: '30%'}}></div>
                <button className="Landing-button" onClick={clearData}>TEST CLR DATA</button>
                <button className="Landing-button" onClick={setData}>TEST SET DATA</button>
                <button className="Landing-button" onClick={getData}>TEST GET DATA</button>
                <div className="Landing-Name-Display">
                    Welcome back, {username}!
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="Sidebar" style={{width: '15%', borderRight: '1px solid black'} }>
                <LandingButton text="🎮 Play" set_path="/" />
                <LandingButton text="📝 Sign Up" set_path = "/signuppage" />
                <LandingButton text="🔑 Sign In" set_path= "/loginpage"/>
                <LandingButton text="📘 About" set_path="/" />
                <LandingButton text="⚙️ Settings" set_path="/"/>
                <div style={{marginTop: '30%'}}></div>

                {/*TEST CODE REMOVE LATER*/}
                <button className="Landing-button" onClick={clearData}>TEST CLR DATA</button>
                <button className="Landing-button" onClick={setData}>TEST SET DATA</button>
                <button className="Landing-button" onClick={getData}>TEST GET DATA</button>

            </div>
        )
    }
	
};

export default LeftPane;