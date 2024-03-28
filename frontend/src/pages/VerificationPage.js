import React from "react";
import VerificationUI from "../components/VerificationUI.js";

// required for token verification
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function VerificationPage() {

    var urlParams;
    var token;

    // on page load,
    useEffect(() => {

        // get the parameters of the URL
        urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
        
        // const decodedPayload = jwt.decode(token);
        // console.log("decodedPayload = " + decodedPayload);
        
        // send the token to the verifyUser api for processing:
        
        console.log("TOKEN RECEIVED = " + token);

        doVerify();
    
    }, [token]);

    const doVerify = async () => {
        let request = { token: token };

        const response = await fetch(
            // "http://localhost:5000/api/verifyUser",
            "https://sudokuapp-f0e20225784a.herokuapp.com/verifyUser",
            {
                method: "POST",
                body: JSON.stringify(request),

                headers: { "Content-Type": "application/json" },
            }
        );

        let res = JSON.parse(await response.text());
        if (res.message) alert(res.message);
    }
    
    return <VerificationUI />;
}