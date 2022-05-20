import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export const SideNavBar = ({id}) => {

    const [driveLinks, setDriveLinks] = useState([])
    
    useEffect(() => {

        (async () => {
            const url = `${process.env.REACT_APP_SERVER}/drivelist/`
            const res = await fetch(url)
            const data = await res.json()
            setDriveLinks(data.files)
        })()

    }, [])

    return (
        <div id={id}>
            <h2 style={{color: "#0D4A6E", fontSize: "1.5rem"}} >Workshops</h2>
            <ul>
            {driveLinks.map(file => (
                <li key={file.id} style={{margin: "10px", borderBottom: "2px solid #222"}}>
                    <Link to={`/workshop?fileId=${file.id}`}>{file.name}</Link>
                </li>
            ))}
            </ul>
        </div>
    )
}
