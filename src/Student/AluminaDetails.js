import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import "./aluminaDetails.css"
import { auth } from '../firebaseConfig';
import api from "../Axios"


function AluminaDetails() {

    const [is_firstjob, setIs_firstjob] = useState('');
    const [current_profile, setCurrent_Profile]=useState('');
    const [position,setPosition]=useState('');
    const [organization_name, setOrganization_name]=useState('');
    const [salary, setSalary]=useState(''); 
    
    const handleRadioChange = (event) => {
        setIs_firstjob(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const alumina = await api.post('students/alumina', {
               stu_id: auth.currentUser.uid,
                current_profile,
                position,
                organization_name,
                salary,
                is_firstjob: (is_firstjob == 'yes') ? true : false,
            })
            console.log(alumina);
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <div className="b">

            <div className="Card">
                
                    <form className="registration-Form">

                        <h2>Alumina Details</h2>
                        <select className="dropdown" onChange={(e) => setCurrent_Profile(e.target.value)}>
                            <option defaultValue="Current Profile" hidden>Current Profile</option>
                            <option value="job" >Job</option>
                            <option value="entrepreneur" >Entreprenuer</option>
                            <option value="highereducation" >Heigher Education</option>
                        </select>
                        <input type="text" placeholder="Position" onChange={(e) => setPosition(e.target.value)}/>
                        <input type="text" placeholder="Organization Name" onChange={(e) => setOrganization_name(e.target.value)}/>
                        <input type="text" placeholder="Salary" onChange={(e) => setSalary(e.target.value)}/>
                    

                       
                        
                        <div id="firstJob">
                            <p>Is it your first job?</p>
                            <RadioGroup  name="isFirstJob"  onChange={handleRadioChange} defaultValue="yes">
                                <label htmlFor="yes">
                                    Yes<Radio value="yes" name="yes"/>
                                </label>
                                <label htmlFor="no">
                                    No<Radio value="no" name="no"/>
                                </label>
                                
                            </RadioGroup>
                        </div>  
                        

                        <div className="bottom-btn">
                            <Link className="n-btn" to="/Academic_Details">
                                <Button className="btns" type="submit" onClick={handleSubmit} >Next</Button>      
                            </Link>
                        </div>
                        
                    </form>
                
            </div>
            
        </div>
    )
}

export default AluminaDetails