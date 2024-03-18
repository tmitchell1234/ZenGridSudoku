import React from "react";
import VerificationUI from "../components/VerificationUI.js";

// required for token verification
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// not working for some reason :(
//import jwt from 'jsonwebtoken';

export default function VerificationPage() {

    const { token } = useParams();


    // TODO: Come back and fix JWT getting and API call


    /*
    useEffect(() => {
        /*
        const decodedPayload = jwt.decode(token);
        console.log("decodedPayload = " + decodedPayload);
        */

        // send the token to the verifyUser api for processing:
        /*
        console.log("TOKEN RECEIVED = " + token);

        let request = { token: token };

        const response = fetch(
            "http://localhost:5000/api/verifyUser",
            {
                method: "POST",
                body: JSON.stringify(request),

                headers: { "Content-Type": "application/json" },
            }
        );
        

        /*
        ( async() => {
            let res = JSON.parse((await response).text());
            if (res.message) alert(res.message);
        })
        */
        //let res = JSON.parse(await response.text());
        // if (res.message) alert(res.message);
    /*
    }, [token]);
    */

    return <VerificationUI />;
}