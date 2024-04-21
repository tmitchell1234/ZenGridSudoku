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

            <div className="innerContainer">
                <h2>You Win!</h2>
                {time_taken.length > 2 ? <h3>Your time: {time_taken}s</h3> : <h3>Your time: {time_taken}</h3>}
                {logged_in ? <h3>Time saved to profile</h3> : <h3>Log in to save your times</h3>}
                <button onClick={handleReload}>Solve Another!</button>
            </div>

        </div>
    );
};

export default WinScreen;