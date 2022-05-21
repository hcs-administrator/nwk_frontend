import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export const SideNavBar = ({id}) => {

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

    }, [seriesLinks, seasonLinks, episodeLinks, selectedSeries, selectedSeason, selectedEpisode])

    return (
        <div id={id}>
            <h2 style={{color: "#0D4A6E", fontSize: "1.5rem"}} >Workshops</h2>
            <div className="text-xl p-2">
                <h3>Series</h3>
                <select id="series" name="series" defaultValue={{label: "Select an Option", value: "none"}}  className="text-base p-2 bg-sky-300 m-4 rounded-md w-96" onChange={e => changeSeries(e.target.value)}>
                    <option value="none" >Select an Option</option>
                    {seriesLinks.map(file => (
                        <option key={file.id} value={file.id} >{file.name}</option>
                    ))}
                    </select>
                <h3>Seasons</h3>
                <select id="seasons" name="seasons" defaultValue={{label: "Select a series first", value: "none"}} className="text-base p-2 bg-sky-300 m-4 rounded-md w-96" onChange={e => changeSeason(e.target.value)}>
                    <option defaultValue="none" >Select a series first</option>
                    {seasonLinks.map(file => (
                        <option key={file.id} value={file.id} >{file.name}</option>
                    ))}
                </select>
                <h3>Episodes</h3>
                <select id="episodes" name="episodes" defaultValue={{label: "Select a season first", value: "none"}} className="text-base p-2 bg-sky-300 m-4 rounded-md w-96" onChange={e => changeEpisode(e.target.value)}>
                    <option defaultValue="none" >Select a season first</option>
                    {episodeLinks.map(file => (
                        <option key={file.id} value={file.id} >{file.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

//style={{margin: "10px", borderBottom: "2px solid #222" }}