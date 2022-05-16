import { Fragment, useEffect } from 'react';

import {Header} from '../components/Header'
import {Banner} from '../components/Banner'

import { SideNavBar } from '../components/SideNavBar'

export const Privacy = () => {

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
                
                <h1 className="text-2xl mb-4">Privacy</h1>

                <p>
                    The Ngā Whānau O Karaiti Kāhui Ako is a collection of resources that support Christian Education.
                    <br /><br />
                    The information is publicly avaible and users do not need to register to view this information.
                    <br /><br />
                    Also no information is collected from the sites visitors.
                </p>

            </div>  

        </div>
    </div>

    </Fragment>
  )
}
