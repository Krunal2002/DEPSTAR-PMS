import React, { useEffect, useState } from 'react'
import "./studentFrame.css"
import SideOptions from "../SideOptions"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Avatar } from '@material-ui/core'
import Dashboard from '../Dashboard';
import StudentDetails from '../StudentDetails';
import { Link, HashRouter, Route, Redirect, useHistory } from "react-router-dom";
import AluminaDetails from './AluminaDetails';
import { auth } from "../firebaseConfig";
import AcademicDetails from './AcademicDetails';
import Student_Comp from './Student_Comp';
import StudentExamDetails from './StudentExamDetails';
import Student_Achivement from './Student_Achivement';
import Student_Skills from './Student_Skills';
import Student_Project from './Student_Project';
import api from "../Axios"



function StudentFrame() {

    const [student, setStudent] = useState(null);

    const history = useHistory();

    const fetchStudent = async () => {
        try {
            const stu = await api.get(`students/stu/${auth.currentUser.uid}`)
            setStudent(stu.data);
        } catch (error) {
            console.log(error);
        }
        console.log(student);
    }
    const LogOut = e => {
        auth.signOut();
        history.push("/");
    }

    useEffect(() => {
        fetchStudent()
    },[])

    return (
        <HashRouter>
        <div className="main">
            
            <div className="sidebar">

                <div className="sProfile">
                    <Avatar id="a" src={student?.avatar} />
                    <h2>{student?.name}</h2>
                </div>

                <div className="options">
                    <Link class="route-link" to="/Dashboard"><SideOptions Icon={HomeOutlinedIcon} title="Dashboard"/> </Link>
                    <Link class="route-link" to="/Student_reg"><SideOptions Icon={ListAltOutlinedIcon} title="Registration"/></Link>
                    <Link class="route-link" to="/Student_Company"><SideOptions Icon={BusinessOutlinedIcon} title="Companies"/> </Link>
                    <Link class="route-link" onClick={LogOut}><SideOptions Icon={ExitToAppOutlinedIcon} title="Logout"/></Link>
                </div>

            </div>
        
            <div className="centerBody">
                {student != null ? <Redirect from="/frame" to="/Dashboard"/> : <Redirect from="/frame" to="/Student_reg"/> }
                
                <Route exact path="/Student_reg" component={StudentDetails}/>
                <Route exact path='/Dashboard' component={Dashboard}/>
                <Route exact path="/Student_Company" component={Student_Comp}/>
                <Route exact path="/aluminaDetails" component={AluminaDetails}/>
                <Route exact path="/Academic_Details" component={AcademicDetails}/>
                <Route path="/StudentExamDetails" component={StudentExamDetails}/>
                <Route path="/Achivements" component={Student_Achivement}/>
                <Route path="/Skills" component={Student_Skills}/>
                <Route path="/Projects" component={Student_Project}/>  
            </div>
            
        </div>

        </HashRouter>
    )
}

export default StudentFrame

