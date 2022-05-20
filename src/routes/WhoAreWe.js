import { Fragment, useEffect } from 'react';

import {Header} from '../components/Header'
import { Footer } from '../components/Footer';

import { SideNavBar } from '../components/SideNavBar'
import { ViewGoogleDocs } from '../components/ViewGoogleDocs'

export const WhoAreWe = () => {

  useEffect(() => {
    document.title = "Kāhui Ako :: Who are we"
  })

  return (
    <Fragment>
      <Header />

{/* flex w-1/2 m-5 mt-5 bg-blue-200 */}
      <div className="flex w-screen justify-center">
        
        <div className="flex w-screen sm:w-2/3 p-2 sm:p-0 justify-center mt-4">

          <div className="hidden sm:flex sm:w-3/6 ">
            <SideNavBar id="sideBar"/>
          </div>

          <div className="w-full text-justify m-4">
            <ViewGoogleDocs fileId={"1NJ68n0ZUudDT_kWFbqyWuJWurZ1HtIKWZvexDg89lZs"} id="who-are-we" />
            <ViewGoogleDocs fileId={"12hU9uGB0bU74rXyZwn6_n9B8qLwrjMgZ7F6zWYdm7cw"} id="our-schools" />
          </div>  

        </div>
      </div>

      <Footer/>

    </Fragment>
  )
}
