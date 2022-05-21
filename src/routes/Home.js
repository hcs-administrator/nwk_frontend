import { Fragment, useEffect } from 'react';


import {Header} from '../components/Header'
import {Banner} from '../components/Banner'
import { Footer } from '../components/Footer';

import { SideNavBar } from '../components/SideNavBar'
import { ViewGoogleDocs } from '../components/ViewGoogleDocs'

export const Home = () => {

  useEffect(() => {
    document.title = "Kāhui Ako :: Home"
  })

  return (
    <Fragment>

        <Header />
        <Banner />

        <div className="flex w-screen justify-center">

          <div className="flex w-screen sm:w-4/5 p-2 sm:p-0 justify-center mt-4">

            <div className="hidden sm:flex sm:6/6 md:w-4/6 ">
              <SideNavBar id="sideBar"/>
            </div>

            <div className="w-screen text-justify m-4 ">
              <ViewGoogleDocs fileId={"1yr3o6AaFcQv-sfzga1cvLrDnnPhXWuTJTLUc9Ftc0Cg"} id="welcome" />
              <ViewGoogleDocs fileId={"1qJNQKQgpHHVPgIxIY3G6LyQDxjC7-c5TSdG7sc-5CrE"} id="resources" />
            </div>  

          </div>

        </div>

        <Footer/>

    </Fragment>
  )
}
