import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import {auth, storage} from "../firebaseConfig"
import api from "../Axios"
import { green } from '@material-ui/core/colors'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function StudentExamDetails() {

    const [stu_id, setStu_Id]=useState('');
    const [exam_name, setExam_name] = useState('');
    const [exam_status, setExam_status] = useState('');
    const [result, setResult] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [Image, setImage] = useState(null)
    const [per, setPer] = useState(0);
    
    

    const handleUpload = () => {
        
        try{
            const ref = storage.ref(`Profile/${auth.currentUser.uid}/Exam Details/`);

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
                        setResultUrl(url)                      
                    })
                }
            )

        }
        catch(err){
            console.log(err);
        }
        
    }

    const add =  async () => {
        try {
            const exam = await api.post('students/exam', {
                stu_id: auth.currentUser.uid, 
                exam_name, 
                exam_status, 
                result: parseInt(result), 
                result_link: resultUrl
            })
            console.log(exam);
        } catch (error) {
            console.log(error);
        }

        setExam_name('');
        setExam_status('');
        setResult('');
        setResultUrl('');
        setImage('');
    }

    return (
        <div className="b">

            <div className="Card">

                <form className="registration-Form">

                    <h2>Exam Details</h2>

                    <input type="text" placeholder="Exam Name" value={exam_name} onChange={ (e) => {setExam_name(e.target.value)} }/>
                    <select className="dropdown"  onChange={(e) => {setExam_status(e.target.value)}}>
                            <option defaultValue="Exam Status" hidden>Select Exam Status</option>
                            <option value="prepration">Prepration</option>
                            <option value="clear">Clear</option>
                        </select>
                    <input type="text" placeholder="Result" value={result} onChange={ (e) => setResult(e.target.value)} />
                    
                    <div className="ufm">
                        <p>Result</p>
                        <div className="file-btn">
                            <input type="file" onChange={ (e)=> {setImage(e.target.files[0])}}/>
                            {(per < 100) ? <Button id="upload-btn" onClick={handleUpload}>Upload</Button> : <CheckCircleIcon style={{color: green[500]}}/>}
                        </div>
                    </div>

                     <div className="bottom-btn">

                            {/* <Link className="add-btn" to="/StudentExamDetails"> */}
                            <div className="add-btn">
                                <Button className="btns" onClick={add}>ADD</Button>
                            </div>
                            {/* </Link> */}
                            
                            <Link className="n-btn" to="/Achivements">
                                <Button className="btns" type="submit">Next</Button>      
                            </Link>
                        </div>

                </form>

            </div>
            
        </div>
    )
}

export default StudentExamDetails