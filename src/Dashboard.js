import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import api from "./Axios"
import { auth } from './firebaseConfig'
import { Redirect, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Coming_Soon from "./assets/Coming_Soon.png"
import GetAppIcon from '@material-ui/icons/GetApp';

// import puppeteer from "puppeteer"


function Dashboard(props) {
    const history = useHistory();
    const [adminID, setAdminID] = useState(null)
    const [load, setLoad] = useState(true);
    const [stuData, setStudata]  = useState(null);
    const [noc, setNoc] = useState(null);


    const nocDown = async () => {
        const data = {
            id: stuData.enroll_id,
            name: stuData.name,
            full_dept: stuData.departments
        }
        try {
            await api.get(`form/noc/${data.id}/${data.name}/${data.full_dept}`)
            const noc = await api.get(`form/noc/down/${data.id}/${data.name}/${data.full_dept}`)
        } catch (error) {
            console.log(error);
        }
    }

    const lorDown = async () => {
        const data = {
            id: stuData.enroll_id,
            name: stuData.name,
            full_dept: stuData.departments
        }
        try {
            await api.get(`form/lor/${data.id}/${data.name}/${data.full_dept}/01-JAN/01-MAY`)
            const lor = await api.get(`form/lor/down/${data.id}/${data.name}/${data.full_dept}/01-JAN/01-MAY`)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStudent = async () => {
        try {
            const stu = await api.get(`students/stu/${auth.currentUser.uid}`)
            setStudata(stu.data)
            fetchAdminId(stu.data.departments)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAdminId = async (name) => {
        try {
            const adminId = await api.get(`admin/dep/${name}`);
            setAdminID(adminId.data.id)
        } catch (error) {
            console.log(error);
        }
    }


    const isConfirm = async () => {
        try {
            const con = await api.get(`general/request/ret/${auth.currentUser.uid}`)
            if(con.data.is_confirm){
                setLoad(false);
            }

            console.log(con.data.is_confirm);
        } catch (error) {
            console.log(error);
        }
    }


    const RequestDoc = async () => {
        try {
            const r = await api.post("general/request", {
                stu_id: auth.currentUser.uid, 
                admin_id: adminID, 
            })
            console.log(r);
        } catch (error) {
            console.log(error);
        }
        console.log();
    }

    useEffect(() => {
        fetchStudent()
        isConfirm()
    },[history])





    return (
        <div className="dashboard">

            <div className="upperDash">

                <div className="upperLeft">

                    <div className="dashboard-content">
                        
                        <div className="dashboard-header">
                            <h4>Welcome to DEPSTAR-PMS</h4>
                        </div>

                        <div className="dashboard-body">
                            <p>Work is Magic and it defines you at every aspect of your Life.  As you work Hard you will become smarter and Irony is that every smart man becomes successful.</p>
                            <br/>
                            
                            <p>Go and Fill your form in Registration</p>
                        </div>

                    </div>


                </div>

                <div className="upperRight">
                    
                    <div className="dashboard-content">
                        
                        <div className="dashboard-header">
                            <h4>Request Form</h4>
                        </div>

                        <div className="req-form-body">
                            <div id="LOR">
                                <p>LOR</p>
                                
                                <Button disabled={load} onClick={lorDown}>
                                    <GetAppIcon/>
                                </Button>
                            </div>
                            
                            <div id="NOC">
                                <p>NOC</p>
                                {/* <Link to="/LOR"> */}
                                    <Button disabled={load} onClick={nocDown} >
                                        <GetAppIcon/>
                                    </Button>
                                {/* </Link> */}
                                
                            </div>

                            <div id="requestForm">
                                <Button id="req-btn" onClick={RequestDoc}>Request Document</Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            <div className="bottomDash">
                <div className="bottomRight">
                    
                    <div className="dashboard-content">
                        
                        <div className="dashboard-header">
                            <h4>Upcoming Drives</h4>
                        </div>

                        <div className="dashboard-body">
                            <img id="comingSoon" src={Coming_Soon}/>
                        </div>

                    </div>

                </div>

                <div className="bottomLeft">
                    
                    <div className="dashboard-content">
                        
                        <div className="dashboard-header">
                            <h4>Companies Visiting</h4>
                        </div>

                        <div className="dashboard-body">
                            <img id="comingSoon" src={Coming_Soon}/>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )

}

export default Dashboard
