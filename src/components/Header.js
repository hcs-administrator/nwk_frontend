import React, {Fragment, useState, useEffect} from 'react'
import logo from '../static/logo_transparent_web_sm.png';

import { Link } from "react-router-dom";

export const Header = () => {

    const [showMenu, setShowMenu] = useState(true)
    
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const [seriesLinks, setSeriesLinks] = useState([])
    const [seasonLinks, setSeasonLinks] = useState([])
    const [episodeLinks, setEpisodesLinks] = useState([])

    const [selectedSeries, setSelectedSeries] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")
    const [selectedEpisode, setSelectedEpisode] = useState("")

    const changeSeries = (selection) => {
        setSeasonLinks([])
        setSelectedSeason(selection)
    }

    const changeSeason = (selection) => {
        setEpisodesLinks([])
        setSelectedEpisode(selection)
    }

    const changeEpisode = (selection) => {
        window.location = `/workshop?fileId=${selection}`
    }

    useEffect(() => {

        // Mobile Menu

        let menuButton = document.querySelector('#menu-button')
        menuButton.addEventListener('click', () => {
            let menuBar = document.querySelector('#menu-bar')
        
            if (showMenu) {
                menuBar.classList.remove('hidden')
                console.log("Menu is shown")
                setShowMenu(!showMenu)
            } else {
                menuBar.classList.add('hidden')
                console.log("Menu is hidden")
                setShowMenu(!showMenu)
            }
        })

        //setWidth(window.innerWidth)
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

        /////////   MENU ///////////////

        setSelectedSeries("11pBICyGBEBABnnlwmbCc9I2WS0zIPjHB")


        if (seriesLinks.length === 0 ) {
            (async () => {
                const url = `${process.env.REACT_APP_SERVER}/drivelist/${selectedSeries}`
                const res = await fetch(url)
                const data = await res.json()
                setSeriesLinks(data.files)
            })()
        }

        if (seasonLinks.length === 0 && selectedSeason !== "") {
            (async () => {
                const url = `${process.env.REACT_APP_SERVER}/drivelist/${selectedSeason}`
                const res = await fetch(url)
                const data = await res.json()
                setSeasonLinks(data.files)
            })()
        }

        if (episodeLinks.length === 0 && selectedEpisode !== "") {
            (async () => {
                const url = `${process.env.REACT_APP_SERVER}/drivelist/${selectedEpisode}`
                const res = await fetch(url)
                const data = await res.json()
                setEpisodesLinks(data.files)
            })()
        }

    }, [showMenu, seriesLinks, seasonLinks, episodeLinks, selectedSeries, selectedSeason, selectedEpisode])

    return (
        <Fragment>
            <div className="flex bg-sky-900 text-white h-20 w-screen items-center p-3">
                
                <img src={logo} alt="Logo" className="flex grow-0 h-full mt-4"/>

                <span className="flex grow text-2xl m-2 righteous">
                    {dimensions.width < 700 ? "Kāhui Ako" : "Ngā Whānau O Karaiti Kāhui Ako"}
                </span>

                {/* <!-- Desktop Menu --> */}
                <div className="grow-0 hidden md:flex cursor">
                    <Link to="/" >
                        <div className="p-2 m-2 rounded-md text-white">
                            Home
                        </div>
                    </Link>
                    <Link to="/who" >
                        <div className="p-2 m-2 rounded-md text-white">
                            Who are we?
                        </div>
                    </Link>
                    <Link to="/calendar" >
                        <div className="p-2 m-2 rounded-md text-white">
                            Calendar
                        </div>
                    </Link>
                </div>

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

            {/* <!-- Mobile Menu --> */}
            <div id="menu-bar" className="h-auto bg-sky-900 text-white w-screen items-center p-3 hidden" >
                <div id="menu">
                    <div className="text-2xl text-left ml-4">Menu</div>
                    <Link to="/" >
                        <div className="bg-blue-100 p-2 m-2 rounded-md text-black">
                            Home
                        </div>
                    </Link>
                    <Link to="/who" >
                        <div className="bg-blue-100 p-2 m-2 rounded-md text-black">
                            Who are we?
                        </div>
                    </Link>
                    <Link to="/calendar" >
                        <div className="bg-blue-100 p-2 m-2 rounded-md text-black">
                            Calendar
                        </div>
                    </Link>
                </div>

                <div id="workshops">
                    <div className="text-2xl text-left ml-4">Workshops</div>

                    <div className="text-xl p-2 ml-2">
                        <h3>Series</h3>
                        <select id="series" name="series" defaultValue={{label: "Select an Option", value: "none"}}  className="text-base p-2 bg-sky-300 m-4 ml-0 rounded-md w-full text-black" onChange={e => changeSeries(e.target.value)}>
                            <option value="none" >Select an Option</option>
                            {seriesLinks.map(file => (
                                <option key={file.id} value={file.id} >{file.name}</option>
                            ))}
                            </select>
                        <h3>Seasons</h3>
                        <select id="seasons" name="seasons" defaultValue={{label: "Select a series first", value: "none"}} className="text-base p-2 bg-sky-300 m-4 ml-0 rounded-md w-full text-black" onChange={e => changeSeason(e.target.value)}>
                            <option defaultValue="none" >Select a series first</option>
                            {seasonLinks.map(file => (
                                <option key={file.id} value={file.id} >{file.name}</option>
                            ))}
                        </select>
                        <h3>Episodes</h3>
                        <select id="episodes" name="episodes" defaultValue={{label: "Select a season first", value: "none"}} className="text-base p-2 bg-sky-300 m-4 ml-0 rounded-md w-full text-black" onChange={e => changeEpisode(e.target.value)}>
                            <option defaultValue="none" >Select a season first</option>
                            {episodeLinks.map(file => (
                                <option key={file.id} value={file.id} >{file.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

        </Fragment>
    );
}
