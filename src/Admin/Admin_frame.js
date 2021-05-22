import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Admin_sidebarOptions from './Admin_sidebarOptions'
import "./Admin_frame.css"
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import { HashRouter, Route, Link, Redirect, useHistory } from 'react-router-dom';
import Admin_dashboard from './Admin_dashboard'; 
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import Admin_Details from './Admin_Details';
import Manage_Student from './Manage_Student';
import Admin_docReq from './Admin_docReq';
import StudentCard from './StudentCard';
import api from "../Axios"
import { auth } from '../firebaseConfig';


function Admin_frame() {
    const [admin, setAdmin] = useState(null);

    const history = useHistory();

    const fetchAdmin = async () => {
        try {
            const admins = await api.get(`admin/${auth.currentUser.uid}`)
            setAdmin(admins.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
       fetchAdmin();
    }, [])

    const LogOut = e => {
        auth.signOut();
        history.push("/");
    }

    return (
        <HashRouter>    
            <div className="main_frame">
                <div className="admin_sidebar">
                    <div className="admin_profile">
                        <Avatar id="avatar" src={admin?.avatar}/>
                        <h2>{admin?.name}</h2>
                    </div>

                    <div className="Admin_options">
                        <Link class="route-link" to="/Admin_dashboard">
                            <Admin_sidebarOptions Icon={HomeIcon} title="Dashboard"/>
                        </Link>

                        <Link class="route-link" to="/Manage_Student">
                            <Admin_sidebarOptions Icon={GroupIcon} title="Manage Students"/>
                        </Link>
                        <Admin_sidebarOptions Icon={BusinessIcon} title="Manage Companies"/>

                        <Link class="route-link" to="/Document_Request">
                            <Admin_sidebarOptions Icon={DescriptionIcon} title="Document Request"/>
                        </Link>
                        <Link class="route-link" to="/Admin_details">
                            <Admin_sidebarOptions Icon={ListAltOutlinedIcon} title="Admin Details"/>
                        </Link>

                        <Link class="route-link" onClick={LogOut}>
                            <Admin_sidebarOptions Icon={ExitToAppOutlinedIcon} title="Logout"/>
                        </Link>
                    </div>
                </div>

                <div className="admin_centerBody">
                    {admin != null ? <Redirect from="/Admin" to="/Admin_dashboard"/> : <Redirect from="/Admin" to="/Admin_details"/>}
                    <Route path="/Admin_dashboard" component={Admin_dashboard}/>
                    <Route path="/Admin_details" component={Admin_Details}/>
                    <Route path="/Manage_Student" component={Manage_Student}/>
                    <Route path="/Document_Request" component={Admin_docReq}/>
                    <Route exact path="/Student" component={StudentCard}/>

                </div>
            </div>
        </HashRouter>

    )
}

export default Admin_frame 
