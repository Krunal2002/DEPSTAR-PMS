import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import background from "../assets/g2.jpg";
import "./admin_login.css"
import { Redirect, useHistory } from 'react-router-dom'
import { auth } from '../firebaseConfig';
import {Link} from "react-router-dom"

function Admin_Login() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState('')

    const history = useHistory();

    

    const adminLogin = (e) => {
        e.preventDefault();

        if(email.includes("@charusat.ac.in") && password != null){
            setError('')

            auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                history.push("/Admin");
            })
            .catch(error => {
                setError("Invalid Credentials!!!")
            })
        }else{
            setError("Invalid Credentials")
        }
    }

    return (
        <div className="Register_main">
            <img src={background}/>

            <div id="loginCard">

                <form id="admin_loginFrom">
                    <h1>Log In</h1>
                    <input id="admin_input" type="email" placeholder="User Name" value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input id="admin_input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                    {error && <div className="error"> {error} </div>}

                    <Button id="admin_login" type="submit" onClick={adminLogin}>Login</Button>
                    <Link id="loginLink" to="/resetPass">Reset Password</Link>
                </form>

            </div>
        </div>
    )
}

export default Admin_Login
