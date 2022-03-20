import { Fragment } from 'react';

import {Header} from '../components/Header'

import { SideNavBar } from '../components/SideNavBar'
import { ViewGoogleDocs } from '../components/ViewGoogleDocs'

export const WhoAreWe = () => {
  return (
    <Fragment>
      <Header />

      <div className="flex grow w-screen mt-5">
        <div className="flex grow w-4/5 justify-center">

          <SideNavBar id="sideBar"/>

          <div className="sm: p-8 md:p-0">
            <ViewGoogleDocs fileId={"1NJ68n0ZUudDT_kWFbqyWuJWurZ1HtIKWZvexDg89lZs"} id="who-are-we" />
            <ViewGoogleDocs fileId={"12hU9uGB0bU74rXyZwn6_n9B8qLwrjMgZ7F6zWYdm7cw"} id="our-schools" />
          </div>  
        </div>
      </div>

    </Fragment>
  )
}
