import React, { useEffect, useState } from 'react'
import "./manage_Student.css"
import TinderCard from 'react-tinder-card'
import { Avatar, Button } from '@material-ui/core';
import api from "../Axios"

function Manage_Student() {

    const [students, setStudents] = useState([]);

    const fetchStudent = async () => {
        try {
            const student = await api.get('students')
            setStudents(student.data)
        } catch (error) {
            console.log(error);
        }
    }


    const deleteStudent = async (id) => {
        try {
            const stu = await api.patch(`students/del/${id}`)
            fetchStudent()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStudent()
    }, [])

    return (
        <div className="tinderCard">
            {students.map(s => (
                <TinderCard key={s.id} className="Swipe" preventSwipe={['up', 'down']}>
                <div className="Student-mng-body">
                    <div id="upperSec"> 
                        <div id="profileInfo">
                            <Avatar id="mng-avatar" src={s.avatar}/>
                        </div>

                        <div id="s-Details">
                            <table>

                                <tr>
                                    <td>Name:</td>
                                    <td>{s?.name}</td>
                                </tr>
                                <tr>
                                    <td>Enroll ID:</td>
                                    <td>{s?.enroll_id}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{s?.email}</td>
                                </tr>
                                <tr>
                                    <td>Department:</td>
                                    <td>{s?.departments}</td>
                                </tr>
                                <tr>
                                    <td>Institute:</td>
                                    <td>{s?.institutes}</td>
                                </tr>
                                <tr>
                                    <td>Current Status:</td>
                                    <td>{s?.current_status}</td>
                                </tr>
                                
                                <tr>
                                    <td>Addmission Year</td>
                                    <td>{s?.admission_year}</td>
                                </tr>
                                <tr>
                                    <td>Graduation year</td>
                                    <td>{s?.graduation_year}</td>
                                </tr>

                                <tr>
                                    <td colSpan="2" >
                                        <Button id="delete-btn" onClick={() => deleteStudent(s?.id)}>Delete</Button>
                                    </td>
                                </tr>
                            </table>
                        </div>

                    
                    </div>

                        
                    </div>
                </TinderCard>
            ))}
        </div>
            
            
        
    )
}

export default Manage_Student 