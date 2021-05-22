import { Button } from '@material-ui/core'
import { green } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import api from "../Axios"
import { auth, storage } from '../firebaseConfig';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function Admin_Details() {
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [phone, setPhone]=useState('');
    const [avatar, setAvatar]=useState('');
    const [institute, setInstitute] = useState([])
    const [department, setDepartment] = useState([])
    const [departmentId, setDepartmentId] = useState(null);
    const [per ,setPer] = useState(0);

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


    const [Image, setImage] = useState(null)
    
    const handleUpload = () => {
        
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
                        setAvatar(url);
                        console.log(url);
                    })
                }
            )

        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect(() => {
        fetchInstitute();
    },[])
    const history = useHistory()
    const handleSubmit = async ()=> {
        try {
            const admin = await api.post('admin', {
                id: auth.currentUser.uid, 
                name, 
                email, 
                phone, 
                avatar, 
                dept_id: parseInt(departmentId)
            })
            history.push('/Admin_dashboard')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="b">
            <div className="Card">
                
                    <form className="registration-Form">

                        <h2>General Details</h2>

                        <div className="ufm">
                            <p className="label">Add Profile Picture</p>
                            <div className="file-btn">
                                <input type="file" onChange={ (e)=> {setImage(e.target.files[0])}}/>
                                {(per < 100) ? <Button id="upload-btn" onClick={handleUpload}>Upload</Button> : <CheckCircleIcon style={{color: green[500]}}/>}
                            </div>
                        </div>

                        <input type="text" placeholder="Name" onChange={ (e) => {setName(e.target.value)} }/>
                        <input type="email" placeholder="Email" onChange={ (e) => {setEmail(e.target.value)} }/>
                        <input type="text" placeholder="Mobile No." onChange={ (e) => {setPhone(e.target.value)} }/>
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
                        

                        <Button id="next-btn" type="submit" onClick={handleSubmit}>Submit</Button>
                    </form>
               
            </div>
        </div>
    )
}

export default Admin_Details
