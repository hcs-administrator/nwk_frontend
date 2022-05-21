import React, {Fragment, useState, useEffect} from 'react'
import logo from '../static/logo_transparent_web_sm.png';

// import { Link } from "react-router-dom";


export const Footer = () => {

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const [seriesLinks, setSeriesLinks] = useState([])
    const [seasonLinks0, setSeasonLinks0] = useState([])
    const [seasonLinks1, setSeasonLinks1] = useState([])
    // const [episodeLinks0, setEpisodesLinks0] = useState([])
    // const [episodeLinks1, setEpisodesLinks1] = useState([])

    const [selectedSeries, setSelectedSeries] = useState("")
    const [selectedSeason0, setSelectedSeason0] = useState("")
    const [selectedSeason1, setSelectedSeason1] = useState("")
    // const [selectedEpisode0, setSelectedEpisode0] = useState("")
    // const [selectedEpisode1, setSelectedEpisode1] = useState("")

    useEffect(() => {

        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        })

        setSelectedSeries("11pBICyGBEBABnnlwmbCc9I2WS0zIPjHB")
        setSelectedSeason0("11sQc7Z9CKvmb6do6EENe6pwP6Aa97YzQ")
        setSelectedSeason1("11sL745IB8b1-a5wzKwwvLFLYlsdNLrev")

        //console.log(seriesLinks)

        // setSelectedEpisode0("11pBICyGBEBABnnlwmbCc9I2WS0zIPjHB")
        // setSelectedEpisode1("11pBICyGBEBABnnlwmbCc9I2WS0zIPjHB")

        if (seriesLinks.length === 0 ) {
            (async () => {
                const url = `${process.env.REACT_APP_SERVER}/drivelist/${selectedSeries}`
                const res = await fetch(url)
                const data = await res.json()
                setSeriesLinks(data.files)
            })()
        }

        if (seasonLinks0.length === 0 && selectedSeason0 !== "") {
            (async () => {
                const url = `${process.env.REACT_APP_SERVER}/drivelist/${selectedSeason0}`
                const res = await fetch(url)
                const data = await res.json()
                setSeasonLinks0(data.files)
            })()
        }

        if (seasonLinks1.length === 0 && selectedSeason1 !== "") {
            (async () => {
                const url = `${process.env.REACT_APP_SERVER}/drivelist/${selectedSeason1}`
                const res = await fetch(url)
                const data = await res.json()
                setSeasonLinks1(data.files)
            })()
        }

        // if (episodeLinks.length === 0 && selectedEpisode !== "") {
        //     (async () => {
        //         const url = `${process.env.REACT_APP_SERVER}/drivelist/${selectedEpisode}`
        //         const res = await fetch(url)
        //         const data = await res.json()
        //         setEpisodesLinks(data.files)
        //     })()
        // }

    }, [seriesLinks,selectedSeries,seasonLinks0,selectedSeason0,seasonLinks1,selectedSeason1]) //,episodeLinks,selectedEpisode])

    return (
        <Fragment>
            <div className="flex flex-row bg-slate-100 w-full mt-24">

                <div className="w-11/12">
                    
                    <div className="flex flex-col text-2xl text-sky-900 m-4 my-1 righteous text-left w-full">
                        {dimensions.width < 700 ? "Kāhui Ako" : "Ngā Whānau O Karaiti Kāhui Ako"}
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="flex text-lg m-4 my-1 font-bold">
                            Workshops
                        </div>
                    </div>

                    <div className="flex flex-col text-sm m-4 mt-1">
                        {seriesLinks.length > 0 ?seriesLinks[0].name : ""}
                        <div className="flex flex-col ">
                            {seasonLinks0.map((s, i) => (
                                <div key={i}>{s.name}</div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col text-sm m-4 mt-1">
                        {seriesLinks.length > 0 ?seriesLinks[1].name : ""}
                        <div className="flex flex-col ">
                            {seasonLinks1.map((s, i) => (
                                <div key={i}>{s.name}</div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="w-1/12 px-2">
                    <img src={logo} alt="Logo" className="mt-4" style={{width: 100}} />
                </div>

            </div>
        </Fragment>
    );
}