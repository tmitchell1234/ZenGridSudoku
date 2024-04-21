import React from 'react';
import '../App.css';
import LandingButton from './LandingButton';
import { useNavigate } from "react-router-dom";

let user_data;
let username;
let id;

if(localStorage && localStorage.getItem("user_data")) {
    user_data = JSON.parse(localStorage.getItem("user_data"));
    getData();
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
    }
}

function logOut() {
    localStorage.clear();
    window.location.reload();
}

function LeftPane()
{
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    if(localStorage && localStorage.getItem("user_data")) {
        return(
            <div className="Sidebar">
                <LandingButton text="🎮 Play" do_on_click={() => routeChange("/")} />
                <LandingButton text="📘 About" do_on_click={() => routeChange("/about-us")} />
                <LandingButton text="⚙️ Profile" set_path="/profilepage" do_on_click={() => routeChange("/profilepage")}/>
                <button className="Landing-button" onClick={logOut}>🔓 Log Out</button>

                <div className="Landing-Name-Display">
                    Welcome back, {username}!
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="Sidebar" >

                <LandingButton text="🎮 Play" do_on_click={() => routeChange("/")}/>
                <LandingButton text="📝 Sign Up" do_on_click={() => routeChange("/signuppage")}/>
                <LandingButton text="🔑 Sign In" do_on_click={() => routeChange("/loginpage")}/>
                <LandingButton text="📘 About" do_on_click={() => routeChange("/about-us")}/>
                <LandingButton text="👤 Profile" do_on_click={() => routeChange("/profilepage")}/>
                <div style={{marginTop: '30%'}}></div>

            </div>
        )
    }
	
};

export default LeftPane;