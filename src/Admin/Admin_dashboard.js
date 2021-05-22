import React from 'react'
import "./admin_Dashboard.css"
import Coming_Soon from "../assets/Coming_Soon.png"

function Admin_dashboard() {
    return (
        <div className="admin_dashboard">

            <div className="admin_upperDash">

                <div className="admin_upperLeft">

                    <div className="admin_dashboard-content">
                        
                        <div className="admin_dashboard-header">
                            <h4>Welcome to DEPSTAR-PMS</h4>
                        </div>

                        <div className="admin_dashboard-body">
                            <p>Hello Admin ! Have a great day with us.You can add and delete students as well as companies. You can approve request for documents given by students.</p>
                            <br/>
                            <p>Hope you enjoy doing that. Greetings!</p>
                        </div>

                    </div>


                </div>

                <div className="admin_upperRight">
                    
                    <div className="admin_dashboard-content">
                        
                        <div className="admin_dashboard-header">
                            <h4>New Request</h4>
                        </div>

                        <div className="admin_dashboard-body">
                            <img id="comingSoon" src={Coming_Soon}/>
                        </div>
                        

                    </div>
                </div>

            </div>


            <div className="admin_bottomDash">
                <div className="admin_bottomRight">
                    
                    <div className="admin_dashboard-content">
                        
                        <div className="admin_dashboard-header">
                            <h4>Upcoming Drives</h4>
                        </div>

                        <div className="admin_dashboard-body">
                            <img id="comingSoon" src={Coming_Soon}/>
                        </div>

                    </div>

                </div>

                <div className="admin_bottomLeft">
                    
                    <div className="admin_dashboard-content">
                        
                        <div className="admin_dashboard-header">
                            <h4>New Registrations</h4>
                        </div>

                        <div className="admin_dashboard-body">
                            <img id="comingSoon" src={Coming_Soon}/>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Admin_dashboard
