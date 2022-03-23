import { Fragment, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import {Header} from '../components/Header'

import { SideNavBar } from '../components/SideNavBar'
import { ViewGoogleDocs } from '../components/ViewGoogleDocs'
// import { ViewGoogleSlides } from '../components/ViewGoogleSlides'
// import { ViewVideo } from '../components/ViewVideo';

//{fileId}
export const Workshops = () => {

  let fileId = useLocation().search.split("=")[1]

  const [docId, setDocId] = useState("")

  useEffect(() => {

    const getFiles = async () => {
      return  fetch(`${process.env.REACT_APP_SERVER}/getAllFilesFromFolder/${fileId}`)
              .then(res => res.json())
              .then(data => {

                if (data.length > 0) {
                  let getDocId = data.filter(d => d.mimeType === "application/vnd.google-apps.document")[0].id
                  setDocId(getDocId)
                } else {
                  setDocId("NO FILES")
                }

              })
    }
    getFiles()

  }, [fileId, docId])

  return (
    <Fragment>
      <Header />

      <div className="flex w-screen justify-center">
        
        <div className="flex w-screen sm:w-1/2 p-2 sm:p-0 justify-center mt-4">

          <div className="hidden sm:flex sm:w-2/6">
            <SideNavBar id="sideBar"/>
          </div>

          <div className="w-full text-justify">
            {docId !== "NO FILES" ? <ViewGoogleDocs fileId={docId} id="document" /> : <h1>No Document in Folder...</h1>}
          </div>  

        </div>
      </div>

    </Fragment>
  )
}