import React from 'react';
import '../css/winScreen.css';
import '../App.css';
import smile from '../images/smile.png';
import happyKids from '../images/happyKids.png';
import { useNavigate } from "react-router-dom";
import LandingButton from '../components/LandingButton';

function WinScreen(props) {
    const { time_taken, logged_in } = props;

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="outerContainer">
            <img src={smile} alt="Smiley face" />

            <div className="innerContainer">
                <h2>You Win!</h2>
                {time_taken.length > 2 ? <h2>Your time: {time_taken}s</h2> : <h2>Your time: {time_taken}</h2>}
                {logged_in ? <h2>Time saved to profile</h2> : <h2>Log in to save your times</h2>}
                <button onClick={handleReload}>Solve Another!</button>
            </div>

            <img src={happyKids} alt="Happy kids" />

        </div>
    );
};

export default WinScreen;