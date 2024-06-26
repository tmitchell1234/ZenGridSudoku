import "../css/sign-up.css";
import { React, useRef, useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Alert from "react-bootstrap/Alert";

export default function SignUp() {
  let navigate = useNavigate();

  const routeChange = () => {
    navigate("/loginpage");
  };

  const inputRef = useRef(null);

  const [popOver, setPopOver] = useState(false);
  const [show, setShow] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  // empty class-level request to store and submit new account info
  var request;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, []);

  //   Checks if the password is valid
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

  const handleEmail = (e) => {
    setInputs({ ...inputs, email: e.target.value });
  };
  const handleName = (e) => {
    setInputs({ ...inputs, userName: e.target.value });
  };
  const handlePassword = (e) => {
    setInputs({ ...inputs, password: e.target.value });
  };
  const handlePasswordChecker = (e) => {
    setInputs({ ...inputs, passwordCheck: e.target.value });
  };

  const handleSubmitBtnClick = (e) => {
    e.preventDefault();

    if (!validPassword) {
      setAlertMessage("Password does not meet security requirements.");
      setShow(true);
    } else if (inputs.password !== inputs.passwordCheck) {
      setAlertMessage("Passwords do not match.");
      setShow(true);
    } else if (inputs.email === "" || inputs.userName === "") {
      setAlertMessage("Input fields required!");
      setShow(true);
    } else {
      //Fetch API
      request = {
        username: inputs.userName,
        email: inputs.email,
        password: inputs.password,
      };

      doCreateAccount();
    }
  };

  const doCreateAccount = async () => {
    try {
      const response = await fetch(
        "https://sudokuapp-f0e20225784a.herokuapp.com/api/createuser",
        //"http://localhost:5000/api/createuser",
        {
          method: "POST",
          body: JSON.stringify(request),

          headers: { "Content-Type": "application/json" },
        }
      );

      let res = JSON.parse(await response.text());
      // if (res.message) alert(res.message);

      let user = {
        username: res.username,
        id: res.id,
      };
      setShowSuccess(true);
    } catch (e) {
      //alert("Account create failed! Check console log");
      console.log(e);
    }
  };

  return (
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
                  <li>Have at least one symbol</li>
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
      <div className="sign-up-section">
        <div className="sign-up-title">Sign Up</div>

        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={handleName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={handleEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={inputRef}
              onChange={handlePassword}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Your Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChecker}
            />
          </Form.Group>

          {show && (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{alertMessage}</p>
            </Alert>
          )}
          {showSuccess && (
            <Alert
              variant="danger"
              onClose={() => setShowSuccess(false)}
              dismissible
            >
              <Alert.Heading>Email Sent</Alert.Heading>
              <p>Thank you for signing up! We've sent a confirmation email</p>
            </Alert>
          )}
          <div className="sign-up-btn" id="submit-btn">
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmitBtnClick}
            >
              Submit
            </Button>
          </div>
        </Form>

        <div className="or-border">
          <h1>
            <span></span>
          </h1>
          <div className="or">
            <h2>or</h2>
          </div>
          <h1>
            <span></span>
          </h1>
        </div>

        <div className="login-btn">
          <Button
            className="btn-primary"
            id="sign-up-btn"
            variant="primary"
            type="submit"
            onClick={routeChange}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
