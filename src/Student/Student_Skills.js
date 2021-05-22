import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { auth } from '../firebaseConfig';
import api from "../Axios"

function Student_Skills() {

    const [skill_1,setSkill_1]=useState('');
    const [skill_2,setSkill_2]=useState('');
    const [skill_3,setSkill_3]=useState('');

    const handleSubmit = async () => {
        try {
            const skill = await api.post('students/skill', {
                stu_id: auth.currentUser.uid, 
                skill_1, 
                skill_2, 
                skill_3,
            })
            console.log(skill);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="b">
            <div className="Card">
                <form className="registration-Form">
                    <h2>Skills</h2>

                    
                    <input type="text" placeholder="Skill 1" onChange={ (e) => {setSkill_1(e.target.value)} }/>
                    <input type="text" placeholder="Skill 2" onChange={ (e) => {setSkill_2(e.target.value)} }/>
                    <input type="text" placeholder="Skill 3" onChange={ (e) => {setSkill_3(e.target.value)} }/>

                    <div className="bottom-btn">
                            <Link className="n-btn" to="/Projects">
                                <Button className="btns" type="submit" onClick={handleSubmit}>Next</Button>      
                            </Link>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default Student_Skills
