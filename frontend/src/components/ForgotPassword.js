import React from "react";
import SvgLockLogo from "../images/SvgLockLogo";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ForgotPassword() {

    const navigate = useNavigate();
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
          <Form.Control type="text" placeholder="Email" />
        </Form.Group>
      </Form>
      <Button>Send</Button>
      <Button onClick = {()=>navigate("/loginpage")}>Back to Log In</Button>
    </div>
  );
}
