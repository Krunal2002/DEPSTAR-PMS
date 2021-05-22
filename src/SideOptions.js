import React from 'react'
import "./SideOptions.css"

function SideOptions({Icon,title}) {
    return (
        <div className="sideOptions">
            {Icon && <Icon id="icons"/>}
            <h4>{title}</h4>
        </div>
    )
}


export default SideOptions
