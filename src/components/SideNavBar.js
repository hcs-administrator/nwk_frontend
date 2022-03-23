import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export const SideNavBar = ({id}) => {

    const [driveLinks, setDriveLinks] = useState([])
    
    useEffect(() => {

        const getDriveLinks = async () => {

            return await fetch(`${process.env.REACT_APP_SERVER}/drivelist/`)
            .then(res => res.json())
            .then(data => {

                setDriveLinks(data.files)

            })
        }

        getDriveLinks()

    }, [])

    return (
        <div id={id}>
            <h2 style={{color: "#0D4A6E", fontSize: "1.5rem"}} >Workshops</h2>
            <ul>
                {driveLinks.length > 0 && (
                    driveLinks.map(file => {
                        return (
                            <li key={file.id} style={{margin: "10px", borderBottom: "2px solid #222"}}>
                                <Link to={`/workshop?fileId=${file.id}`}>{file.name}</Link>
                            </li>
                        )
                    })
                )} {driveLinks.length === 0 && (
                    <li>
                        {"Loading..."}
                    </li>
                )} 
            </ul>
        </div>
    )
}
