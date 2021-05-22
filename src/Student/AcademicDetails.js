import React, { useState } from 'react'
import "./AcademicDetails.css"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import {auth} from "../firebaseConfig"
import api from '../Axios.js';

function AcademicDetails() {

    const [sgpa_1, setSgpa1] = useState(null);
    const [sgpa_2, setSgpa2] = useState(null);
    const [sgpa_3, setSgpa3] = useState(null);
    const [sgpa_4, setSgpa4] = useState(null);
    const [sgpa_5, setSgpa5] = useState(null);
    const [sgpa_6, setSgpa6] = useState(null);
    const [sgpa_7, setSgpa7] = useState(null);
    const [sgpa_8, setSgpa8] = useState(null);
    const [cgpa, setCgpa] = useState(null);
    const [backlogs, setBacklogs] = useState(null);
    const [ssc, setSsc] = useState(null);
    const [hsc, setHsc] = useState(null);

    

    const handleSubmit = async () => {
        try {
            const academic = await api.post('students/academic', {
               stu_id: auth.currentUser.uid,
                sgpa_1,
                sgpa_2,
                sgpa_3,
                sgpa_4,
                sgpa_5,
                sgpa_6,
                sgpa_7,
                sgpa_8,
                cgpa,
                ssc,
                hsc,
                backlogs,
            })
            console.log(academic);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="b">

            <div className="Card">
                    <form className="registration-Form">
                        <h2>Academic Details</h2>

                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 1" onChange={ (e) => {setSgpa1(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 2" onChange={ (e) => {setSgpa2(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 3" onChange={ (e) => {setSgpa3(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 4" onChange={ (e) => {setSgpa4(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 5" onChange={ (e) => {setSgpa5(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 6" onChange={ (e) => {setSgpa6(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 7" onChange={ (e) => {setSgpa7(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="SGPA of semester 8" onChange={ (e) => {setSgpa8(e.target.value)} }/> 
                        <input type="number" min="0" max="10" step="0.1" placeholder="Current CGPA" onChange={ (e) => {setCgpa(e.target.value)} }/> 

                        <input type="number" min="0" max="100" placeholder="SSC" onChange={ (e) => {setSsc(e.target.value)} }/>  
                        <input type="number" min="0" max="100" placeholder="HSC" onChange={ (e) => {setHsc(e.target.value)} }/>  

                        <input type="number" min="0" max="10" step="1" placeholder="Backlog" onChange={ (e) => {setBacklogs(e.target.value)} }/> 

                        <div className="bottom-btn">
                            <Link className="n-btn" to="/StudentExamDetails">
                                <Button className="btns" type="submit" onClick={handleSubmit} >Next</Button>      
                            </Link>
                        </div>

                    </form>

            </div>
            
        </div>
    )
}

export default AcademicDetails
