import React from 'react'
import "./admin_sideOptions.css"

function Admin_sidebarOptions({Icon,title}) {
    return (
        <div className="admin_sideOptions">

                {Icon && <Icon id="icons"/>}
                <h4>{title}</h4>
            
        </div>
    )
}

export default Admin_sidebarOptions
