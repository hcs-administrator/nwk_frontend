import { useEffect } from 'react'

export const SideNavBar = ({id}) => {

    //drivelist
    useEffect(() => {

        const getDriveLinks = async (id) => {

            return await fetch(`http://localhost:4000/drivelist/`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                let output = ""

                output = `<h2 className="bg-blue-600">Workshops</h2>`

                output += `<ul>
                        ${data.files.map(file => {
                            return (
                                `<li><a href="#">${file.name}</a></li>`
                            )
                        }).join("")}
                    </ul>`

                const fileIdContainer = document.querySelector(`#${id}`)
                fileIdContainer.innerHTML = output
            })
        }

        getDriveLinks(id)

    })

    return <div id={id} className="flex-col sm: hidden md:flex" style={{flex: 0.4}} />
}
