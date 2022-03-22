import { useEffect } from 'react'
//import { Link } from "react-router-dom";

export const SideNavBar = ({id}) => {

    //drivelist
    useEffect(() => {

        const getDriveLinks = async (id) => {

            return await fetch(`${process.env.REACT_APP_SERVER}/drivelist/`)
            .then(res => res.json())
            .then(data => {

                let output = ""

                output = `<h2 style="color: #0D4A6E; font-size: 1.5rem" >Workshops</h2>`

                output += `<ul>
                        ${data.files.map(file => {
                            return (
                                `<li style="margin: 10px; border-bottom: 2px solid #222"><a href="/workshops/${file.id}"}>${file.name}</a></li>`
                            )
                        }).join("")}
                    </ul>`

                const fileIdContainer = document.querySelector(`#${id}`)
                fileIdContainer.innerHTML = ""
                fileIdContainer.innerHTML = output
            })
        }

        getDriveLinks(id)

    })

    return <div id={id} />
}
