import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./studentCard.css"
import api from "../Axios"

function StudentCard(props) {

    const id = props.location.state;
    

    const [students, setStudents] = useState(null);

    const fetchStudent = async () => {
        try {
            const stu = await api.get(`students/${id}`)
            setStudents(stu.data.data)
        } catch (error) {
            console.log(error);
        }
    }

  

    useEffect(() => {
        fetchStudent();
    }, [])

    return (
         <div className="Student-mng-Body">
                    <div className="generalDetails">
                            <div className="studentAvatar">
                                <Avatar id="avatar" src={students?.student.avatar} >KM</Avatar>
                            </div>

                        <div className="studentDetails">
                            <table>

                                    <tr>
                                        <td>Name:</td>
                                        <td>{students?.student.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Enroll ID:</td>
                                        <td>{students?.student.enroll_id}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{students?.student.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile No.:</td>
                                        <td>{students?.student.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Department:</td>
                                        <td>{students?.student.departments}</td>
                                    </tr>
                                    <tr>
                                        <td>Institute:</td>
                                        <td>{students?.student.institutes}</td>
                                    </tr>
                                    <tr>
                                        <td>Current Status:</td>
                                        <td>{students?.student.current_status}</td>
                                    </tr>
                            </table>
                        </div>
                    </div>

                <div className="academicDetails">
                    <table>
                                <tr>
                                    <td>Bio</td>
                                    <td>{students?.student.bio}</td>
                                </tr>
                                <tr>
                                    <td>Current CGPA:</td>
                                    <td>{students?.academic?.cgpa}</td>
                                </tr>
                                {/* <tr>
                                    <td>Skills:</td>
                                    <td>{students?.skill?.skill_1}</td>
                                </tr> */}



                                <tr>
                                    <td>GitHub link</td>
                                    <td>{students?.achivement?.github_link}</td>
                                </tr>
                                <tr>
                                    <td>LinkedIn Link</td>
                                    <td>{students?.achivement?.linkedin_link}</td>
                                </tr>

                                {/* <tr>
                                    <td>Country:</td>
                                    <td>India</td>
                                </tr> */}


                                <tr>
                                    <td>Addmission Year</td>
                                    <td>{students?.student?.admission_year}</td>
                                </tr>
                                <tr>
                                    <td>Graduation year</td>
                                    <td>{students?.student?.graduation_year}</td>
                                </tr>
                                
                    </table>
                </div>
        </div>
    ) 
}

export default StudentCard
