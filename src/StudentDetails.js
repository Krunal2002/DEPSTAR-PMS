import { Button, Icon } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./studentDetails.css"
import { Link, Redirect, useHistory } from "react-router-dom";
import api from './Axios.js';
import {auth, storage} from "./firebaseConfig";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';


function StudentDetails() {

    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [institute, setInstitute] = useState([])
    const [department, setDepartment] = useState([])
    const [stateId, setStateId] = useState(null);
    const [departmentId, setDepartmentId] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState('');
    const [enroll_id, setEnroll_id] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [addressline, setAddressline] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [admission_year, setAdmission_year] = useState(null);
    const [graduation_year, setGraduation_year] = useState(null);
    const [discAction, setDiscAction] = useState(null);
    const [ufm,setUfm] = useState(null);
    const [avatar, setAvatar]=useState(null);
    const [per, setPer] = useState(0)

    const history = useHistory();

    const fetchInstitute = async () => {
        try {
            const institute = await api.get('general/institute')
            setInstitute(institute.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDepartment = async (id) => {
        try {
            const department = await api.get(`general/department/${id}`)
            setDepartment(department.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCountry = async () => {
        try {
            const country = await api.get('general/country')
            setCountry(country.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const fetchState = async (id) => {
        try {
            const state = await api.get(`general/state/${id}`)
            setState(state.data);
        } catch (error) {
            console.log(error);
        }
    }



    // Image Upload
    const [Image, setImage] = useState(null)
    
    
    const handleUpload = (s) => {
        try{
            const ref = storage.ref(`Profile/${auth.currentUser.uid}/`);

            const uploadtask = ref.child(`${Image.name}`).put(Image)
            uploadtask.on(
                "state_changed",
                (snapshot) =>{
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 1000;
                    setPer(percentage)
                },
                error => {
                    console.log(error);
                },
                () => {
                    ref.child(Image.name).getDownloadURL()
                    .then( url => {
                        switch (s) {
                            case "avatar":
                                setAvatar(url);
                                break;
                            case "da":
                                setDiscAction(url);
                                break;
                            case "ufm":
                                setUfm(url);
                                break;                   
                        }
                    })
                }
            )

        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect(() => {
        fetchCountry();
        fetchInstitute();
    },[])


    const handleSubmit = async () => {
        try {
            const student = await api.post('students', {
                id: auth.currentUser.uid, name, enroll_id, email, phone, dept_id: parseInt(departmentId), bio, avatar, current_status: currentStatus, ufm, disciplinary_action: discAction, state_id: parseInt(stateId), city, addressline, zipcode, admission_year: parseInt(admission_year), graduation_year: parseInt(graduation_year)
            })
            console.log(student);
        } catch (error) {
            console.log(error);
        }

        if(currentStatus == "alumina"){
            history.push("/aluminaDetails");
        } else{
            history.push("/Academic_Details");
        }
    }


    return (
        <div className="b">
            <div className="Card">

                    <form className="registration-Form">
                        <h2>Student Details</h2>

                        
                        <div className="ufm">
                            <p className="label">Add Professional photo</p>
                            <div className="file-btn">
                                <input type="file" onChange={ (e)=> {setImage(e.target.files[0])}}/>
                                {(per < 100) ? <Button id="upload-btn" onClick={() => handleUpload("avatar")}>Upload</Button> : <CheckCircleIcon style={{color: green[500]}}/>}
                            </div>
                        </div>


                        <input type="text" placeholder="Full Name" onChange={ (e) => {setName(e.target.value)} }/>       
                        <input type="email" placeholder="Email" onChange={ (e) => {setEmail(e.target.value)} }/>       
                        <input type="text" placeholder="Enrollment No." onChange={ (e) => {setEnroll_id(e.target.value)} }/>       
                        <input type="phone" placeholder="Mobile No." onChange={ (e) => {setPhone(e.target.value)} }/>   
                                   
                       
                        <select className="dropdown" onChange={(e) => {fetchDepartment(e.target.value)}}>
                            <option defaultValue="Institute" hidden>Select Institute</option>
                            {institute.map(i => (
                                <option key={i?.id} value={i?.id} >{i?.name}</option>
                            ))
                            }
                        </select>

                        <select className="dropdown" onChange={(e) => {setDepartmentId(e.target.value)}}>
                            <option defaultValue="Department" hidden>Select Department</option>
                            {department.map(d => (
                                <option key={d?.id} value={d?.id} >{d?.name}</option>
                            ))
                            }
                        </select>
                       

                        <input type="text" placeholder="Bio" onChange={ (e) => {setBio(e.target.value)} }/>   

                        <select className="dropdown"  onChange={(e) => {setCurrentStatus(e.target.value)}}>
                            <option value="Current Status" hidden>Select Current Status</option>
                            <option value="alumina">Alumina</option>
                            <option value="student">Student</option>
                        </select>

                        <input type="text" placeholder="Address" onChange={ (e) => {setAddressline(e.target.value)} }/>
                        <input type="text" placeholder="City" onChange={ (e) => {setCity(e.target.value)} }/>

                        <select className="dropdown" onChange={(e) => {fetchState(e.target.value)}}>
                            <option defaultValue="Country" hidden>Select Country</option>
                            {country.map(c => (
                                <option key={c?.id} value={c?.id} >{c?.name}</option>
                            ))
                            }
                        </select>


                       <select className="dropdown" onChange={(e) => {setStateId(e.target.value)}}>
                            <option defaultValue="State" hidden>Select State</option>
                            {state.map(s => (
                                <option key={s?.id} value={s?.id} >{s?.name}</option>
                            ))
                            }
                        </select>

                         
                        <input type="text" placeholder="Postal Code" onChange={ (e) => {setZipcode(e.target.value)} }/>
                        <input type="text" placeholder="Addmision Year" onChange={ (e) => {setAdmission_year(e.target.value)} }/>
                        <input type="text" placeholder="Graduation Year" onChange={ (e) => {setGraduation_year(e.target.value)} }/>
                        

                        <div className="ufm">
                            <p className="label">Have you ever convicted for any disciplinary action/any disciplinary action pending?</p>
                            <div className="file-btn">
                                <input type="file" onChange={ (e)=> {setImage(e.target.files[0])}}/>
                                {(discAction == null) ? <Button id="upload-btn" onClick={() => handleUpload("da")}>Upload</Button> : <CheckCircleIcon style={{color: green[500]}}/>}
                            </div>
                        </div>
                        
                        <div className="ufm">
                            <p className="label">Does any UFM case reported against you in any of examination? </p>
                            <div className="file-btn">
                                <input type="file" onChange={ (e)=> {setImage(e.target.files[0])}}/>
                                {(ufm == null) ? <Button id="upload-btn" onClick={() => handleUpload("ufm")}>Upload</Button> : <CheckCircleIcon style={{color: green[500]}}/>}
                            </div>
                        </div>

                    

                        <Link id="next-btn" to="/Academic_Details">
                        {/* { (currentStatus == "alumina") ? "/aluminaDetails" : "/Academic_Details"} */}
                            <Button id="next-btn" type="submit" onClick={handleSubmit} >Next</Button>      
                        </Link>
                    </form>
                
                
            </div>
        </div>
    )
}

export default StudentDetails
