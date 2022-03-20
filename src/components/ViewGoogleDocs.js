import { useEffect } from 'react'

export const ViewGoogleDocs = ({fileId, id}) => {

    useEffect(() => {
        const getFile = async (fileId, id) => {
            return await fetch(`http://localhost:4000/getFile/${fileId}`)
            .then(res => res.json())
            .then(data => {

                let getImage = (imageId) => data.inlineObjects[imageId].inlineObjectProperties.embeddedObject.imageProperties.contentUri

                const content = data.body.content.filter(c => c.hasOwnProperty('paragraph') || c.hasOwnProperty('table'))
                //console.log(content) //6 has an image

                const output = content.map(o => {

                    //console.log(o)

                    // IF Object is a textRun with Heading
                    if ( o.hasOwnProperty('paragraph') ) {
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
                                //console.log(styles)
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

                                //console.log(o.paragraph.elements[0])

                                return (
                                    `<img style="max-width: 200px" src=${getImage(o.paragraph.elements[0].inlineObjectElement.inlineObjectId)} alt="google_image" />`
                                )
                            } 
                        }                        
                        //return <p>${o.paragraph.paragraphStyle.namedStyleType}</p>
                    } 

                    else if ( o.hasOwnProperty('table') ) {

                        //console.log(o.table)

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

    return <div id={id} style={{flex: 0.4}}/>
}
