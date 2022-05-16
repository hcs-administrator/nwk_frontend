import { Fragment, useEffect } from 'react';

import {Header} from '../components/Header'

import { SideNavBar } from '../components/SideNavBar'

export const Calendar = () => {

  useEffect(() => {
    document.title = "Kāhui Ako :: Calendar"
  })

  return (
    <Fragment>
      <Header />

      <div className="flex w-screen justify-center">
        
        <div className="flex w-screen sm:w-2/3 p-2 sm:p-0 justify-center mt-4">

          <div className="hidden sm:flex sm:w-3/6 ">
            <SideNavBar id="sideBar"/>
          </div>

          <div className="w-full text-justify m-4">
            <iframe src="https://calendar.google.com/calendar/embed?src=kahuiakonz%40gmail.com&ctz=Pacific%2FAuckland" style={{border: 0, width: "100%", height: "600px"}} title="calendar" scrolling="no"></iframe>
          </div>  

        </div>
      </div>

    </Fragment>
  )
}
