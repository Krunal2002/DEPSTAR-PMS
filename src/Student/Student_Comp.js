import React, { useState } from 'react'
import { storage } from '../firebaseConfig'
import "./Student_Comp.css"
import Coming_Soon from "../assets/Coming_Soon.png";

function Student_Comp() {
    
    // const [Image, setImage] = useState(null)
    // const [url, seturl] = useState(null);
    
    // const handleUpload = e => {
        
    //     try{
    //         const ref = storage.ref(`Profile/`);
    //         const Image = e.target.files[0];

    //         const uploadtask = ref.child(`${Image.name}`).put(Image)
    //         uploadtask.on(
    //             "state_changed",
    //             (snapshot) =>{

    //             },
    //             error => {
    //                 console.log(error);
    //             },
    //             () => {
    //                 ref.child(Image.name).getDownloadURL()
    //                 .then( url => {
    //                     console.log(url);
    //                 })
    //             }
    //         )

    //     }
    //     catch(err){
    //         console.log(err);
    //     }
        
    // }


    return (
        <div className="Student-company">
            <div className="company-content">
                <div className="comp-name">
                    <h2>TATA CONSULTANCY SERVICE</h2>
                </div>

                <div className="company-details">
                    {/* <input type="file" onChange={handleUpload}/> */}
                    <img id="comingSoon" src={Coming_Soon}/>
                </div>
            </div>
        </div>
    )
}

export default Student_Comp
