import React from 'react'
import { Link } from "react-router-dom";

import logo from '../static/logo_transparent_web_sm.png';
import background from '../static/cropped-omer-faruk-bekdemir-5BuxuWIJF1Q-unsplash.jpeg'

export const Banner = () => {
    return (
        <div className="flex h-full w-screen items-center">
            <img src={background} alt="Logo" className="relative h-96 w-screen opacity-60 blur-sm mt-1 mb-2"/>
            
            <div className="flex absolute w-screen p-8 lg:m-0 lg:w-3/5 justify-center">
                <img src={logo} alt="Logo" className="w-0 md:w-36 lg:w-48 pr-4"/>
                <div className="w-screen lg:w-96">
                    <h1 className="font-bold myFont pb-2 text-2xl">Ngā Whānau O Karaiti Kāhui Ako</h1>
                    <h1 className="myFont text-xl">To collaborate as a Christian community of learning for all ākonga to be equipped and to realise their holistic God-given purpose to experience shalom.</h1>

                    <div className="flex">
                        <Link to="/who" className="rounded-full bg-sky-900 pl-4 p-2 mt-2 pt-3 sm:pt-2 w-1/2 myFont text-white cursor">
                            Who are we?
                        </Link>

                        <div className="rounded-full bg-white pl-4 p-2 mt-2 pt-3 sm:pt-2 w-1/2 myFont border-2 border-sky-900 cursor">View Workshops</div>
                    </div>

                </div>
            </div>

        </div>
    );
}
