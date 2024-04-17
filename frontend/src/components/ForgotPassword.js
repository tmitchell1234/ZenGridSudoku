import { React, useRef, useState, useEffect } from "react";
import SvgLockLogo from "../images/SvgLockLogo";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Alert from "react-bootstrap/Alert";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showNotUsed, setShowNotUsed] = useState(false);

    const [inputs, setInputs] = useState({
      email: ""
    });

    const handleEmail = (e) => {
      setInputs({ ...inputs, email: e.target.value });
    };

    const handleSubmit = () => {
        // get email input field and make API call
        console.log("Entered email value is:");
        console.log(inputs.email);

        doReset();
    };

    const doReset = async () => {
      try
      {
        //console.log("inputs.email = " + inputs.email);

        var req = { email: inputs.email };
        console.log(JSON.stringify(req));

        const response = await fetch(
          "https://sudokuapp-f0e20225784a.herokuapp.com/api/forgotEmail",
          //"http://localhost:5000/api/forgotEmail",
          {
            method: "POST",
            body: JSON.stringify(req),

            headers: { "Content-Type": "application/json" },
          }
        );

        let res = JSON.parse(await response.text());

        if (res.message == "Email not in use")
        {
          console.log("Email is not in use!");
          setShowNotUsed(true);
        }
        else if (res.message == "Forgot password email sent successfully!")
        {
          console.log("Email sent successfully!");
          setShowSuccess(true);
        }
        else
        {
          console.log("There was some kind of failure, try again");
        }
      }
      catch (e)
      {
        console.log(e);
      }
    };

  return (
    <div className="forget-pass-section">
      {" "}
      <SvgLockLogo />
      <div className="title">Forgot Password</div>
      <div className="subtitle">
        Enter the email you used to create your account so we can send you a
        link for resetting your password.
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" onChange={handleEmail} placeholder="Email" />
        </Form.Group>
      </Form>

      {showNotUsed && (
        <Alert variant="primary" onClose={() => setShowNotUsed(false)} dismissible>
          <Alert.Heading>Not in use!</Alert.Heading>
          <p>The email you entered is not in use.</p>
        </Alert>
      )}

      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          <Alert.Heading>Email sent successfully!</Alert.Heading>
          <p>Please visit the link sent to this email to reset your password.</p>
        </Alert>
      )}

      <Button onClick = {handleSubmit}>Send</Button>
      <Button onClick = {()=>navigate("/loginpage")}>Back to Log In</Button>
      <Button onClick = {()=>navigate("/")}>Home</Button>
    </div>
  );
}
