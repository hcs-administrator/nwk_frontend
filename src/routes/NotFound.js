import { Fragment, useEffect } from 'react';

import {Header} from '../components/Header'
import {Banner} from '../components/Banner'
import { Footer } from '../components/Footer';

import { SideNavBar } from '../components/SideNavBar'

export const NotFound = () => {

  useEffect(() => {
    document.title = "Kāhui Ako :: Privacy"
  })

  return (
    <Fragment>

        <Header />
        <Banner />

        <div className="flex w-screen justify-center">

            <div className="flex w-screen sm:w-2/3 p-2 sm:p-0 justify-center mt-4">

              <div className="hidden sm:flex sm:w-3/6 ">
                <SideNavBar id="sideBar"/>
              </div>

                <div className="w-full text-justify m-4">
                    
                    <h1 className="text-2xl mb-4">Page Not Found</h1>

                    <p>Please select a workshop from the menu</p>

                </div>  

            </div>
        </div>

        <Footer/>

    </Fragment>
  )
}
