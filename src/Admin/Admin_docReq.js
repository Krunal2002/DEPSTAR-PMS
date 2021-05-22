import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./docReq.css"
import { auth } from '../firebaseConfig'
import api from "../Axios"
import StudentCard from './StudentCard'
import { Link } from 'react-router-dom'

function Admin_docReq() {

    const [pendingReq, setPendingReq] = useState([]);
    const [id, setId] = useState('');

    const fetchPendingReq = async () => {
        try {
            const p_req =  await api.get(`general/request/${auth.currentUser.uid}`)
            setPendingReq(p_req.data);
        } catch (error) {
            console.log(error);
        }        
    }

    const approve = async (id) => {
        try {
            const app = await api.patch(`general/request/${parseInt(id)}`)
            fetchPendingReq();
        } catch (error) {
            console.log(error);
        }
    }

    const reject = async (id) => {
        try {
            const del = await api.delete(`general/request/${parseInt(id)}`)
            fetchPendingReq();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPendingReq();
    }, []);

    return (
        <div className="docReq">
            {/* <div className="docReq_header">

            </div> */}

            <div className="docReq_body">
               <table>
                   <tr>
                       <th>Student Name</th>
                       <th>Enroll ID</th>
                       <th>Approve</th>
                       <th>Reject</th>
                       <th>Get Details</th>
                   </tr>
                   {pendingReq.map((m) => (
                      <tr key={m.id}>
                            <td>{m.stu_name}</td>
                            <td>{m.enroll_id}</td>
                            <td>
                                <Button id="app-btn" onClick={() => {approve(m.id)}}>Approve</Button>  
                            </td>
                            <td>
                                <Button id="tbl-btn" onClick={() => {reject(m.id)}}>Reject</Button>  
                            </td>
                            <td>
                                <Link id="cardLink" to={{
                                    pathname: "/Student",
                                    state: m.enroll_id,
                                }}>
                                    <Button id="get-btn">Details</Button>  
                                </Link>
                            </td>
                      </tr>
                   ))}
               </table>
            </div>
        </div>
        )
}

export default Admin_docReq
