import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import api from "../Axios";
import { auth } from '../firebaseConfig';


function Student_Achivement() {
    const [achivement_name, setAchivementName]= useState('');
    const [achivement_detail, setAchivementDetails]= useState('');
    const [certificate_link, setCertificate_link]= useState('');
    const [github_link, setGithub]= useState('');
    const [linkedin_link, setLinkedin]= useState('');
    
    const handleSubmit = async () => {
        try {
            const achivement = await api.post('students/achivement', {
                stu_id: auth.currentUser.uid,
                achivement_name,
                achivement_detail,
                certificate_link,
                github_link,
                linkedin_link,
            })
            console.log(achivement);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="b">
            <div className="Card">
                <form className="registration-Form">
                    <h2>Achivements</h2>

                    
                    <input type="text" placeholder="Achivement Name" onChange={ (e) => {setAchivementName(e.target.value)} }/>
                    <input type="text" placeholder="Achivement Details" onChange={ (e) => {setAchivementDetails(e.target.value)} }/>
                    <input type="text" placeholder="Certificate Link" onChange={ (e) => {setCertificate_link(e.target.value)} }/>
                    <input type="text" placeholder="GitHub Link" onChange={ (e) => {setGithub(e.target.value)} }/>
                    <input type="text" placeholder="LinkedIn Link" onChange={ (e) => {setLinkedin(e.target.value)} }/>

                    <div className="bottom-btn">
                            <Link className="n-btn" to="/Skills">
                                <Button className="btns" type="submit" onClick={handleSubmit} >Next</Button>      
                            </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Student_Achivement