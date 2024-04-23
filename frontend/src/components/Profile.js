import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [show, setShow] = useState(false);
  // when the page loads, call the completion records API and set the values.

  useEffect(() => {
    if (localStorage && localStorage.getItem("user_data")) {
      //console.log(localStorage.getItem("user_data"));

      // retrieve localStorage (cookie) data, and parse the email field from it
      const localStorageData = localStorage.getItem("user_data");
      const parsedData = JSON.parse(localStorageData);
      const storedEmail = parsedData.email;

      //console.log("Saved local storage email:");
      //console.log(storedEmail);

      // now, call the function to do the API call
      getUserData(storedEmail);
    }
  }, []);

  let navigate = useNavigate();

  const getUserData = async (storedEmail) => {
    let request = { email: storedEmail };
    // console.log("inside getUserData, storedEmail = " + storedEmail);

    try {
      const response = await fetch(
        "https://sudokuapp-f0e20225784a.herokuapp.com/api/getUserCompletion",
        {
          method: "POST",
          body: JSON.stringify(request),

          headers: { "Content-Type": "application/json" },
        }
      );

      let res = JSON.parse(await response.text());

      console.log(res);

      // update local variables according to response
      setEasy(res.easy);
      setMedium(res.medium);
      setHard(res.hard);

      console.log("After set functions:");
      console.log("easy = " + easy);
      console.log("medium = " + medium);
      console.log("hard = " + hard);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAccount = async () => {
    const request = {
      email: JSON.parse(localStorage.getItem("user_data"))?.email,
    };
    try {
      const response = await fetch(
        // "http://localhost:5000/api/deleteuser",

        "https://sudokuapp-f0e20225784a.herokuapp.com/api/deleteuser",
        {
          method: "DELETE",
          body: JSON.stringify(request),

          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.clear();
      navigate("/");

      window.location.reload();
    } catch (e) {}
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

            {!show && (
              <div className="delete-btn" onClick={() => setShow(true)}>
                <button>Delete Account</button>
              </div>
            )}
          </div>

          <Alert show={show} variant="danger">
            <Alert.Heading>Delete Account</Alert.Heading>
            <p>Are you sure you want to delete this accoount?</p>
            <hr />
            <div className="d-flex justify-content-end btn-section">
              <Button onClick={deleteAccount} variant="danger">
                Delete
              </Button>
              <Button onClick={() => setShow(false)} variant="danger">
                Close me
              </Button>
            </div>
          </Alert>
        </>
      )}
    </>
  );
}
