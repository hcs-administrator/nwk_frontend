import React, {Fragment, useState, useEffect} from 'react'
// import logo from '../static/logo_transparent_web_sm.png';

// import { Link } from "react-router-dom";

export const Footer = () => {

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {

    })

    return (
        <Fragment>
            <div className="flex bg-sky-700 text-white h-20 w-screen items-center p-3 mt-20">
                <span className="flex grow text-2xl m-2 righteous">
                    {dimensions.width < 700 ? "Kāhui Ako" : "Ngā Whānau O Karaiti Kāhui Ako"}
                </span>
            </div>
        </Fragment>
    );
}
