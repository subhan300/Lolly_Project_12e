import React from 'react'
import Lolly  from "./lolly"
function DynamicLollyPage({pageContext}) {

    console.log(pageContext.ALL_DATA,"pagecontext")
    const obj=pageContext.ALL_DATA
    console.log(obj,"obj",obj.message)

    
    return (
        <div>
            <h1>dynamic page </h1>
            <h5>{obj.sendersName}</h5>
           
            <div>
                <Lolly top={obj.flavorTop}  middle={obj.flavorMid}  bottom={obj.flavorBot} />
                </div>

</div>


           
      
    )
}

export default DynamicLollyPage
