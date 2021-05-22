import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import {auth} from "../firebaseConfig"
import api from "../Axios"


function Student_Project() {
    const [project_name, setProject_name]=useState('');
    const [description, setDescription]=useState('');
    const [project_link, setProject_link]=useState('');

    const history = useHistory();
    const add = async () => {
        try {
            const project = await api.post('students/project', {
                stu_id: auth.currentUser.uid, 
                project_name, 
                description, 
                project_link
            })
            console.log(project);
        } catch (error) {
            console.log(error);
        }

        setProject_link('');
        setProject_name('');
        setDescription('');
    }


    return (
        <div className="b">
            <div className="Card">
                <form className="registration-Form">
                    <h2>Projects</h2>

                    
                    <input type="text" placeholder="Project Name" value={project_name} onChange={ (e) => {setProject_name(e.target.value)} }/>
                    <input type="text" placeholder="Description" value={description} onChange={ (e) => {setDescription(e.target.value)} }/>
                    <input type="text" placeholder="Project Link" value={project_link} onChange={ (e) => {setProject_link(e.target.value)} }/>
                    
                    <div className="bottom-btn">
                        <div className="add-btn">
                            <Button className="btns" onClick={add}>ADD</Button>
                        </div>

                        <Link className="n-btn">
                            <Button className="btns" type="submit" onClick={() => {history.push("/Dashboard")}}>Submit</Button>      
                        </Link>
                            
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default Student_Project
