import React from 'react'
import "./HomePage.css"
import Image from "./assets/Group_250.png";
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import logo from "./assets/homepage.png"

function HomePage() {


    return (
        <div className="home_page">
            
            <div className="home_header">

                <div className="header_left">
                    <img src={logo} alt="logo" />
                </div>
                
                <div className="header_right">
                    <Link to="/Student_Login">
                    <Button className="sl_btn" color="primary">Student Login</Button>
                    </Link>
                    <h4>|</h4>
                    <Link>
                        <Button className="sl_btn" color="primary">Company Login</Button>
                    </Link>
                    <h4>|</h4>
                    <Link to="/Admin_Login">
                        <Button className="sl_btn" color="primary">Admin Login</Button>
                    </Link>
                </div>
               
                
            </div>

            <div className="home_body">

                <div className="body_left">

                    <h5 className="f">Opportunity becomes Dreams</h5> 

                    <h1>Come <br/> and Join Us</h1>

                    <h5 className="f"> We are here to make your Dreams come <br/>true. To make your Placement process easy <br/>and flawless.</h5>

                    <Link to="/register"><Button id="Button">Register Student</Button></Link>

                </div>

                <div className="body_right">

                    <img src={Image} />

                </div>

            </div>

        </div>
    )
}

export default HomePage
