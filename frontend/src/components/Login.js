import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });



  const handleEmail = (e) => {
    setInputs({ ...inputs, email: e.target.value });
  };
  const handlePassword = (e) => {
    setInputs({ ...inputs, password: e.target.value });
  };

  const routeChange = () => {
    navigate("/signuppage");
  };

  const goHome = () => {
    navigate("/");
  };

  let request = { email: inputs.email, password: inputs.password };

  const doLogin = async (event) => {
    try {
      const response = await fetch(
        "https://sudokuapp-f0e20225784a.herokuapp.com/api/login",
        {
          method: "POST",
          body: JSON.stringify(request),

          headers: { "Content-Type": "application/json" },
        }
      );

      let res = JSON.parse(await response.text());
      if (res.message && res.message === "Error: Invalid email/password")
        setShow(true);
      else {

        // new: save user email for use in profile page
        let user = {
          email: res.Email,
          username: res.Username,
          id: res.id,
          verified: res.Verified,
        };

        if (user.verified === false) {
          setShow(true);
          return;
        }


        localStorage.setItem("user_data", JSON.stringify(user));
        goHome();
        window.location.reload();
      }
      // navigate("/");
    } catch (e) {
      setShow(true);
      alert(e);
    }
  };

  return (
    <>
      <div className="login-section">
        {/*
          Header now redirects to homepage so I removed the button for returning to landing page, leaving it here incase we need it
          <Button
          className="btn-primary home-btn"
          variant="primary"
          onClick={goHome}
          >
          Go Home
        </Button>
        */}

        <div className="login-title">Login</div>

        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              onChange={handleEmail}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          </Form.Group>

          <Link className="forgot-pass-link" to="/forgotpasswordpage">
            Forgot password?
          </Link>

          {show && (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>Error: Account has not yet been verified</p>
            </Alert>
          )}
          <div className="login-page-btn" id="submit-btn">
            <Button variant="primary" onClick={doLogin}>
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

        <div className="login-page-btn">
          <Button
            className="btn-primary"
            id="sign-up-btn"
            variant="primary"
            type="submit"
            onClick={routeChange}
          >
            Create Account
          </Button>
        </div>
      </div>
    </>
  );
}
