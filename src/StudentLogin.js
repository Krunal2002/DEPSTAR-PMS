import React, { useEffect, useState } from 'react'
import "./studentLogin.css"
import background from "./assets/g2.jpg";
import { Button } from '@material-ui/core';
import {Link, useHistory } from "react-router-dom";
import { auth } from './firebaseConfig';


function StudentLogin() {
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')

    const history = useHistory();


    const Login = e => {
        e.preventDefault();

        if(email.includes("@charusat.edu.in") && password != null){
            seterror('')

            auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                history.push("/frame");
            })
            .catch(error => {
                seterror("Invalid Credentials!!!")
            })
        }else{
            seterror("Invalid Credentials")
        }
    }
    
    return (
        <div className="Register_main">
            <img src={background}/>

            <div id="loginCard">

                <form id="loginFrom">
                    <h1>Log In</h1>
                    <input type="email" placeholder="Email" value={email} onChange={e => setemail(e.target.value)} required/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setpassword(e.target.value)} required/>
                    {error && <div className="error"> {error} </div>}

                    <Button id="login" type="submit" onClick={Login}>Login</Button>

                    <Link id="loginLink" to="/resetPass">Reset Password</Link>
                    <p>Don't have an account? <Link id="loginLink" to="/register">Sign Up</Link></p>

                </form>

            </div>
        </div>
    )
}


export default StudentLogin
