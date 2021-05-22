import "./Register.css"
import React, { useState} from 'react'
import background from "./assets/g2.jpg";
import Button from '@material-ui/core/Button';
import { auth } from "./firebaseConfig";
import { useHistory, Link } from "react-router-dom"



function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpass, setConfPass] = useState('')
    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [error, setError] = useState('')
   
    const history = useHistory();


    const SignIn = async e => {
        e.preventDefault();

        if( email.includes("@charusat.edu.in")){
            setError('');
            
             try{
                await auth.createUserWithEmailAndPassword(email, password)
                .then(snapshot => {
                    snapshot.user.updateProfile({
                        displayName: f_name+" "+l_name
                        });
                    })
            

                //redirect to dashboard
                history.push("/frame");
            }catch(e){
                console.log(e.message);
            }
        }else{
            setError("Invalid Email ID")
        }
        
    }

    return (
        <div className="Register_main">
            <img src={background}/>
            <div id="card">
                
                <form id="content">
                    
                    <h1>REGISTER</h1>

                    <input type="text" placeholder="First name" value={f_name} onChange={e => setF_name(e.target.value)} />
                    <input type="text" placeholder="Last name" value={l_name} onChange={e => setL_name(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" required  value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" required value={confpass} onChange={e => setConfPass(e.target.value)} />
                    {error && <div className="error"> {error} </div>}

                    <Button disabled={ f_name != "" && l_name != "" && email != "" && password != "" && password == confpass ? false : true } type="submit" onClick={SignIn}>SIGN UP</Button>
                   
                    <p>Already have an account? <Link id="signUpLink" to="/Student_Login">Sign In</Link></p>
                </form>
                
            </div>
        </div>
    )
}

export default Register