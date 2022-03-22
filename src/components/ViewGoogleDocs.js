import { useEffect } from 'react'

export const ViewGoogleDocs = ({fileId, id}) => {

    useEffect(() => {
        const getFile = async (fileId, id) => {
            return await fetch(`${process.env.REACT_APP_SERVER}/getFile/${fileId}`)
            .then(res => res.json())
            .then(data => {

                let getImage = (imageId) => data.inlineObjects[imageId].inlineObjectProperties.embeddedObject.imageProperties.contentUri

                const content = data.body.content.filter(c => c.hasOwnProperty('paragraph') || c.hasOwnProperty('table'))

                const output = content.map(o => {

                    // IF Object is a textRun with Heading
                    if ( o.hasOwnProperty('paragraph') ) {

                        // Change iframe properties
                        if ( o.paragraph.elements[0].textRun.content.substring(0, 7) === "<iframe" ) {
                            let splits = o.paragraph.elements[0].textRun.content.split(" ")

                            return (
                                `<iframe ${splits[1]} style="width: 100%; max-width: 500px; min-height: 300px; max-height: 440px; border: none" ></iframe>`
                            )
                        }

                        if ( o.paragraph.paragraphStyle.namedStyleType === "HEADING_1" ) {
                            if ( o.paragraph.elements[0].textRun.hasOwnProperty('textStyle') ) {
                                let styles = o.paragraph.elements[0].textRun.textStyle
                                return (
                                    `<h1 style="${[
                                        styles.hasOwnProperty('bold') ? `font-weight:bold` : `font-weight:normal`, 
                                        styles.hasOwnProperty('weightedFontFamily') ? `font-family:'${styles.weightedFontFamily.fontFamily}'` : `font-family:'Roboto'`,
                                        styles.hasOwnProperty('fontSize') ? `font-size:${styles.fontSize.magnitude}${styles.fontSize.unit.toLowerCase()}` : `font-size:1rem`,
                                        styles.hasOwnProperty('foregroundColor') ? `color:rgb(${styles.foregroundColor.color.rgbColor.hasOwnProperty('red') ? styles.foregroundColor.color.rgbColor.red * 255 : 0}, ${styles.foregroundColor.color.rgbColor.hasOwnProperty('green') ? styles.foregroundColor.color.rgbColor.green * 255 : 0}, ${styles.foregroundColor.color.rgbColor.hasOwnProperty('blue') ? styles.foregroundColor.color.rgbColor.blue * 255 : 0})` : `color:#000`
                                    ].join(";")}" id=${o.paragraph.paragraphStyle.headingId}>${o.paragraph.elements[0].textRun.content}</h1>`
                                )
                            } else {
                                return (
                                    `<h1 id=${o.paragraph.paragraphStyle.headingId}>${o.paragraph.elements[0].textRun.content}</h1>`
                                )
                            }
                        }

                        else if ( o.paragraph.paragraphStyle.namedStyleType === "HEADING_2" ) {
                            if ( o.paragraph.elements[0].textRun.hasOwnProperty('textStyle') ) {
                                let styles = o.paragraph.elements[0].textRun.textStyle

                                return (
                                    `<h2 style="${[
                                        styles.hasOwnProperty('bold') ? `font-weight:bold;` : `font-weight:normal`, 
                                        styles.hasOwnProperty('weightedFontFamily') ? `font-family:'${styles.weightedFontFamily.fontFamily}'` : `font-family:'Roboto'`,
                                        styles.hasOwnProperty('fontSize') ? `font-size:${styles.fontSize.magnitude}${styles.fontSize.unit.toLowerCase()}` : `font-size:1rem`,
                                        styles.hasOwnProperty('foregroundColor') ? `color:rgb(${styles.foregroundColor.color.rgbColor.hasOwnProperty('red') ? styles.foregroundColor.color.rgbColor.red * 255 : 0}, ${styles.foregroundColor.color.rgbColor.hasOwnProperty('green') ? styles.foregroundColor.color.rgbColor.green * 255 : 0}, ${styles.foregroundColor.color.rgbColor.hasOwnProperty('blue') ? styles.foregroundColor.color.rgbColor.blue * 255 : 0})` : `color:#000`
                                    ].join(";")}" id=${o.paragraph.paragraphStyle.headingId}>${o.paragraph.elements[0].textRun.content}</h2>`
                                )
                            } else {
                                return (
                                    `<h2 id=${o.paragraph.paragraphStyle.headingId}>${o.paragraph.elements[0].textRun.content}</h2>`
                                )
                            }
                        }

                        else if ( o.paragraph.paragraphStyle.namedStyleType === "NORMAL_TEXT" ) {
                            if ( o.paragraph.elements[0].hasOwnProperty('textRun') ) {
                                
                                // Add Styles to Paragraph
                                if ( o.paragraph.elements[0].textRun.hasOwnProperty('textStyle') ) {
                                    let styles = o.paragraph.elements[0].textRun.textStyle
                                    return (
                                        `<p style="${[
                                            styles.hasOwnProperty('bold') ? `font-weight:bold;` : `font-weight:normal`, 
                                            styles.hasOwnProperty('weightedFontFamily') ? `font-family:'${styles.weightedFontFamily.fontFamily}'` : `font-family:'Roboto'`,
                                            styles.hasOwnProperty('fontSize') ? `font-size:${styles.fontSize.magnitude}${styles.fontSize.unit.toLowerCase()}` : `font-size:1rem`,
                                            styles.hasOwnProperty('foregroundColor') ? `color:rgb(${styles.foregroundColor.color.rgbColor.hasOwnProperty('red') ? styles.foregroundColor.color.rgbColor.red * 255 : 0}, ${styles.foregroundColor.color.rgbColor.hasOwnProperty('green') ? styles.foregroundColor.color.rgbColor.green * 255 : 0}, ${styles.foregroundColor.color.rgbColor.hasOwnProperty('blue') ? styles.foregroundColor.color.rgbColor.blue * 255 : 0})` : `color:#000`
                                        ].join(";")}">${o.paragraph.elements[0].textRun.content}</p>`
                                    )
                                } else {
                                    return (
                                        `<p>${o.paragraph.elements[0].textRun.content}</p>`
                                    )
                                }

                            } else if ( o.paragraph.elements[0].hasOwnProperty('inlineObjectElement') ) {

                                return (
                                    `<img style="max-width: 200px" src=${getImage(o.paragraph.elements[0].inlineObjectElement.inlineObjectId)} alt="google_image" />`
                                )
                            } 
                        }                        
                    } 

                    else if ( o.hasOwnProperty('table') ) {

                        return (
                            `<table>
                                <tbody>
                            ${o.table.tableRows.map(tr => {
                                return (
                                    `<tr>
                                    ${tr.tableCells.map(td => {

                                        if (td.content[0].paragraph.elements[0].hasOwnProperty('inlineObjectElement')) {
                                            return (
                                                `<td>
                                                    <img src="${getImage(td.content[0].paragraph.elements[0].inlineObjectElement.inlineObjectId)}" alt="logo" />
                                                </td>`
                                            )
                                        } else {
                                            return (
                                                `<td>
                                                    ${td.content[0].paragraph.elements[0].textRun.content}
                                                </td>`
                                            )
                                        }

                                    }).join("")}
                                    </tr>`
                                )

                            }).join("")}
                                </tbody>
                            </table>`
                        )
                    }

                    return `<p></p>`

                }).join("")

                const fileIdContainer = document.querySelector(`#${id}`)
                fileIdContainer.innerHTML = ""
                fileIdContainer.innerHTML += output

            })
          }

          getFile(fileId, id) 
    })

    return <div id={id} />
}
