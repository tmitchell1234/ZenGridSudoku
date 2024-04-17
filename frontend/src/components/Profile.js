import React, { useReducer } from "react";
import { useState, useEffect } from "react";
export default function Profile() {
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);

  // when the page loads, call the completion records API and set the values.

  useEffect(() => {
    if(localStorage && localStorage.getItem("user_data"))
    {
      console.log(localStorage.getItem("user_data"));
    }
  }, []);

  const getUserData = async () => {
    // let request = { email: email };
  };

  return (
    <>
      {localStorage.getItem("user_data") == null ? (
        <div className="profile-message">Please log in to view this page.</div>
      ) : (
        <>


          <div className="profile-board">
          <div className="username-title">
            {JSON.parse(localStorage.getItem("user_data")).username}'s Profile
          </div>
            <div className="profile-grid">
              <div className="profile-card easy">
                <div className="title">Easy</div>
                <div className="body">{easy}/50</div>
              </div>
              <div className="profile-card medium">
                <div className="title">Medium</div>
                <div className="body">{medium}/50</div>
              </div>
              <div className="profile-card hard">
                <div className="title">Hard</div>
                <div className="body">{hard}/50</div>
              </div>
            </div>

            <div className="delete-btn">
              <button>Delete Account</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
