import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function Login()
{
  let navigate = useNavigate();

  const routeChange = () => {
    navigate("/signuppage");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="login-section">

      <Button
            className="btn-primary"
            id="sign-up-btn"
            variant="primary"
            type="submit"
            onClick={goHome}
          >
            Go Home
          </Button>
      <div className="login-title">Login</div>

        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Link className="forgot-pass-link">Forgot password?</Link>
          <div className="login-page-btn" id="submit-btn">
            <Button variant="primary" type="submit">
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
// const app_name = 'sudokuapp-f0e20225784a';
// function buildPath(route)
// {
// 	if (process.env.NODE_ENV === 'production')
// 	{
// 		return 'https://' + app_name + '.herokuapp.com/' + route;
// 	}
// 	else
// 	{
// 		return 'http://localhost:5000/' + route;
// 	}
// }
// var loginName;
// var loginPassword;

// const [message,setMessage] = useState('');

// const doLogin = async event =>
// {
// 	event.preventDefault();

// 	var obj = {login:loginName.value,password:loginPassword.value};
// 	var js = JSON.stringify(obj);

// 	try
// 	{
// 		const response = await fetch(buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

// 		var res = JSON.parse(await response.text());

// 		if( res.id <= 0 )
// 		{
// 			setMessage('User/Password combination incorrect');
// 		}

// 		else
// 		{
// 			var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
// 					localStorage.setItem('user_data', JSON.stringify(user));

// 			setMessage('');
// 			window.location.href = '/cards';
// 		}
// 	}
// 	catch(e)
// 	{
// 		alert(e.toString());
// 		return;
// 	}
// };

// return(
// 	<div id="loginDiv">
// 		<form onSubmit={doLogin}>
// 		<span id="inner title">PLEASE LOG IN</span><br />
// 		<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
// 		<input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
// 		<input type="submit" id="loginButton" class="buttons" value = "DoIt" onClick={doLogin} />
// 		</form>
// 		<span id="loginResult">{message}</span>
// 	</div>)
