import { Fragment, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import {Header} from '../components/Header'
import { Footer } from '../components/Footer';

import { SideNavBar } from '../components/SideNavBar'
import { ViewGoogleDocs } from '../components/ViewGoogleDocs'

export const Workshops = () => {

  let fileId = useLocation().search.split("=")[1]

  const [docId, setDocId] = useState("NO FILES")

  useEffect(() => {

    document.title = "Kāhui Ako :: Workshop"

    const getFiles = async () => {

      if (fileId !== undefined) {

        const url = `${process.env.REACT_APP_SERVER}/getAllFilesFromFolder/${fileId}`

        const res = await fetch(url)
        const data = await res.json()

        console.log(data)

        if (data.length > 0) {
          let getDocId = data.filter(d => d.mimeType === "application/vnd.google-apps.document")[0].id
          setDocId(getDocId)
        }

      } else {
        setDocId("NO FILES")
      }


    }
    getFiles()

  }, [fileId, docId])

  return (
    <Fragment>
      <Header />

      <div className="flex w-screen justify-center">
        
        <div className="flex w-screen sm:w-4/5 p-2 sm:p-0 justify-center mt-4">

          <div className="hidden sm:flex sm:w-3/6 ">
            <SideNavBar id="sideBar"/>
          </div>

          <div className="w-full text-justify m-4">
            {docId !== "NO FILES" ? <ViewGoogleDocs fileId={docId} id="document" /> : <h1>Please select a workshop from the menu</h1>}
          </div>  

        </div>
      </div>

      <Footer/>

    </Fragment>
  )
}