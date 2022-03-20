import React, {Fragment, useState, useEffect} from 'react'
import logo from '../static/logo_transparent_web_sm.png';

export const Header = () => {

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {

        // Mobile Menu
        let menuButton = document.querySelector('#menu-button')
        menuButton.addEventListener('click', () => {
            
            let menuBar = document.querySelector('#menu-bar')
            menuBar.classList.toggle('hidden')
            //menuBar.classList.toggle('flex')

        })

        const getDriveLinks = async (id) => {

            return await fetch(`http://localhost:4000/drivelist/`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                let output = ""

                output += `<ul>
                        ${data.files.map(file => {
                            return (
                                `<li class="bg-blue-100 p-2 m-2 rounded-md text-black">
                                    <a href="#" className="text-black">${file.name}</a>
                                </li>`
                            )
                        }).join("")}
                    </ul>`

                const fileIdContainer = document.querySelector(`#${id}`)
                fileIdContainer.innerHTML += output
            })
        }

        getDriveLinks('menu-bar')

        //setWidth(window.innerWidth)
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

    })

    return (
        <Fragment>
            <div className="flex bg-sky-900 text-white h-20 w-screen items-center p-3">
                
                <img src={logo} alt="Logo" className="flex grow-0 h-full mt-4"/>

                <span className="flex grow text-2xl m-2 righteous">
                    {dimensions.width < 700 ? "Kāhui Ako" : "Ngā Whānau O Karaiti Kāhui Ako"}
                </span>

                <div className="flex grow-0 md:hidden cursor">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="menu-button"
                        className="h-8 w-8 cursor-pointer md:hidden block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>

            </div>
            <div id="menu-bar" className="h-auto bg-sky-900 text-white w-screen items-center p-3 hidden" >
                <div className="text-2xl text-left ml-4">Workshops</div>
            </div>
        </Fragment>
    );
}
