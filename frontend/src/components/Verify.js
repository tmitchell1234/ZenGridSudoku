import React, { useState } from "react";
import { Link } from "react-router-dom";

// TO DO: Make a verification page CSS (if necessary)
// import "../css/login.css"; 

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


export default function Verify()
{


    return (
        <div className="verified_text_panel">
            <Form className="form">
                <p>Your email has been verified! You are now logged in.</p>
                <Button>RETURN TO MAIN PAGE</Button>
            </Form>
        </div>
    );
}