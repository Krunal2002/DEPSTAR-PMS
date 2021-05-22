import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import background from "./assets/g2.jpg";
import { auth } from './firebaseConfig';
import {Link} from "react-router-dom"


function ForgotPass() {

    const [email, setemail] = useState('')
    const [error, seterror] = useState('')

    const sendMail = () => {
        if(email.includes('@charusat')){
            auth.sendPasswordResetEmail(email)
            .then(() => {
                seterror('Check your Mail!!')
            }).catch((err) => {
                console.log(err.message);
            })
            seterror('Check your Mail')
        } else {
            seterror('Invalid Email address')
        }
        
    }

    return (
        <div className="Register_main">
            <img src={background}/>

            <div id="loginCard">

                <form id="loginFrom">
                    <h1>Reset Password</h1>
                    <input type="email" placeholder="Email" value={email} onChange={e => setemail(e.target.value)} required/>
                    {error && <div className="error"> {error} </div>}

                    <Button id="login" type="submit" onClick={sendMail}>Send Mail</Button>

                    <Link id="loginLink" to="/">Back to Homepage</Link>
                </form>

            </div>
        </div>
    )
}

export default ForgotPass
