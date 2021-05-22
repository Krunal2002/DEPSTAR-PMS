import { React, useEffect } from "react";
import './App.css';
import HomePage from "./HomePage";
import Register from "./Register";
import StudentLogin from "./StudentLogin";
import StudentFrame from "./Student/StudentFrame";
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import { auth } from "./firebaseConfig";
import Admin_frame from "./Admin/Admin_frame";
import Admin_Login from "./Admin/Admin_Login";
import ForgotPass from "./ForgotPass";



function App() {
   useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if(authUser.email.includes('@charusat.edu.in')){
                <Redirect from="/" to="/Admin_Dashboard"/>
            }
            else if(authUser.email.includes('@charusat.ac.in')){
                <Redirect from="/" to="/Admin_Dashboard"/>
            }
        })
       return unsubscribe;
    }, [])

  return (

    
    <div className="app">

      {/* set signIn conformation part */}


      <Router>
      
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/Student_Login" component={StudentLogin}/>
            <Route exact path="/Admin" component={Admin_frame}/>
            <Route path="/frame" component={StudentFrame}/>
            <Route path="/Admin_Login" component={Admin_Login}/>
            <Route path="/resetPass" component={ForgotPass}/>
            

        </Switch>
        

      </Router>


    </div>
  );
}

export default App;
