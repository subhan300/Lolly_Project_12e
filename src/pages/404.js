import React from 'react'
import Lolly from "../components/lolly"

import { useQuery, gql } from "@apollo/client"

const GET_LOLLY_BY_PATH = gql`
  query  getLollyByPath($lollyPath: String!) {
    getLollyByPath(lollyPath: $lollyPath) {
      flavorBot
      flavorMid
      flavorTop
      lollyPath
      message
      recipientName
      sendersName
    }
  }

`


function Error({location}) {
  
    var queryPath = location.pathname.slice(9)
    // console.log(queryPath,"querypath")
    const { loading, error, data } = useQuery(GET_LOLLY_BY_PATH, {
        variables: {  lollyPath: queryPath },
      })
      if (error) {
     return <h1>error</h1>
      }

      if(loading){
          return(<h1>loading.......</h1>)
      }
    
      console.log(data.getLollyByPath,"data dekh error mai hai yeh")
      const D=data.getLollyByPath
    return (
        <div>
            <h1>HERE IS YOUR CARD </h1>
            <h1>LINK : https://brave-colden-8e28fe.netlify.app/lollies/{D.lollyPath}</h1>

            <div>
    <h1>{D.recipientName}</h1>


            <div><Lolly top={D.flavorTop}  middle={D.flavorMid}  bottom={D.flavorBot} /></div>
    <div><h1>{D.sendersName}</h1></div>
            </div>
        </div>
    )
}

export default Error
