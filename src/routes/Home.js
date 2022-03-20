import { Fragment } from 'react';


import {Header} from '../components/Header'
import {Banner} from '../components/Banner'

import { ViewGoogleDocs } from '../components/ViewGoogleDocs'
import { SideNavBar } from '../components/SideNavBar'

export const Home = () => {
  return (
    <Fragment>

      <Header />
      <Banner />

      <div className="flex grow w-screen mt-5">
        <div className="flex grow w-4/5 justify-center">

          <SideNavBar id="sideBar"/>

          <div className="sm: p-8 md:p-0">
            <ViewGoogleDocs fileId={"1yr3o6AaFcQv-sfzga1cvLrDnnPhXWuTJTLUc9Ftc0Cg"} id="welcome" />
            <ViewGoogleDocs fileId={"1qJNQKQgpHHVPgIxIY3G6LyQDxjC7-c5TSdG7sc-5CrE"} id="resources" />
          </div>

        </div>
      </div>

    </Fragment>
  )
}
