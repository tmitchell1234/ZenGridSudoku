// import React from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { React, useRef, useState, useEffect } from "react";

import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Alert from "react-bootstrap/Alert";

export default function PasswordReset() {
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const [popOver, setPopOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Testing: setting token = URLparams... inside useEffect doesn't save token data to "token" class variable.
  // Maybe doing this similar method here will actually save the info?

  const [tokenInput, setToken] = useState("");

  const [inputs, setInputs] = useState({
    password: "",
    passwordCheck: "",
  });

  // empty class-level request to store and submit new password info
  var request;

  var urlParams;
  //var token;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);

    // on page load, get parse the JWT from the URL parameters

    // get the parameters of the URL
    urlParams = new URLSearchParams(window.location.search);
    //token = urlParams.get('token');

    console.log("urlParams.get('token') = ");
    console.log(urlParams.get("token"));

    const tokenFromURL = urlParams.get("token");

    setToken(tokenFromURL);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, []);

  // Checks if the password is valid
  useEffect(() => {
    if (
      inputs.password.length >= 8 &&
      inputs.password !== inputs.password.toLowerCase() &&
      inputs.password.match(/[|()\\/~^:,;#?!&%$@*+]/) !== null
    )
      setValidPassword(true);
    else setValidPassword(false);
  }, [inputs.password]);

  const handleClickListener = (event) => {
    let clickedInside = inputRef && inputRef.current.contains(event.target);
    setPopOver(clickedInside);
  };

  const handlePassword = (e) => {
    setInputs({ ...inputs, password: e.target.value });
  };

  const handlePasswordChecker = (e) => {
    setInputs({ ...inputs, passwordCheck: e.target.value });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    //console.log("Got inside handlePasswordReset");

    if (!validPassword) {
      console.log("Failed inside !validPassword");

      setAlertMessage("Password does not meet security requirements.");
      setShow(true);
    } else if (inputs.password !== inputs.passwordCheck) {
      console.log("Failed inside 2nd condition");

      setAlertMessage("Passwords do not match.");
      setShow(true);
    } else if (inputs.password === "" || inputs.passwordCheck === "") {
      console.log("Failed inside 3rd condition");

      setAlertMessage("Input fields required!");
      setShow(true);
    } else {
      console.log("Got to fetch API part");
      console.log("tokenInput = " + tokenInput);

      //Fetch API
      request = {
        token: tokenInput,
        newpassword: inputs.password,
      };

      doPasswordReset();
    }
  };

  const doPasswordReset = async () => {
    try {
      //console.log("DEBUGGING: request = ");
      //console.log(request);

      const response = await fetch(
        "https://sudokuapp-f0e20225784a.herokuapp.com/api/passwordreset",
        //"http://localhost:5000/api/passwordreset",
        {
          method: "POST",
          body: JSON.stringify(request),

          headers: { "Content-Type": "application/json" },
        }
      );

      let res = JSON.parse(await response.text());

      if ((res.message = "Password updated successfully!")) {
        console.log("Verified successful password update!");

        setShowSuccess(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // borrowing the password requirements overlay from SignUp
    <>
      <Overlay placement="left" target={inputRef} show={popOver}>
        <Popover>
          <Popover.Body>
            <div className="popover-body">
              <p>Password requirements:</p>
              <ul>
                {inputs.password.length < 8 ? (
                  <li>Password should be 8 characters long.</li>
                ) : (
                  <li style={{ textDecoration: "line-through" }}>
                    Password should be 8 characters long.
                  </li>
                )}
                {inputs.password === inputs.password.toLowerCase() ? (
                  <li>Have at least one uppercase</li>
                ) : (
                  <li style={{ textDecoration: "line-through" }}>
                    Have at least one uppercase.
                  </li>
                )}
                {inputs.password.match(/[|()\\/~^:,;#?!&%$@*+]/) === null ? (
                  <li>Have at leaste one symbol</li>
                ) : (
                  <li style={{ textDecoration: "line-through" }}>
                    Have at leaste one symbol.
                  </li>
                )}
              </ul>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>

      <div className="forget-pass-section">
        <div className="title">Password Reset Form</div>
        <div className="subtitle">Enter the new password for your account.</div>

        <Form className="reset-form">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              ref={inputRef}
              onChange={handlePassword}
              placeholder="New password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>

            <Form.Control
              type="password"
              onChange={handlePasswordChecker}
              placeholder="Confirm password"
            />
          </Form.Group>
        </Form>

        {showSuccess && (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            <Alert.Heading>Password reset successfully!</Alert.Heading>
            <p>You can now log in with your new password</p>
          </Alert>
        )}

        {show && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{alertMessage}</p>
          </Alert>
        )}
        <Button onClick={handlePasswordReset} className="navigation-btn">
          Reset Password
        </Button>
        <Button
          onClick={() => navigate("/loginpage")}
          className="navigation-btn"
        >
          Back to Log In
        </Button>
        <Button onClick={() => navigate("/")} className="navigation-btn">
          Home
        </Button>
      </div>
    </>
  );
}
