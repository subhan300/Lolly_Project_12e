import React,{useState,useRef} from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from 'graphql-tag';
import Lolly from "../components/lolly"
import { navigate } from "gatsby"


const Graphql_Data=gql`
{
  getAllLollies{
    recipientName,
    sendersName,
    message,
    flavorTop,
    flavorMid,
    flavorBot,
    lollyPath,
  }
}

`
// mutatiojn ka hai yeh 

const createLollyMutation = gql`
  mutation createLolly(
    $recipientName: String!
    $sendersName: String!
    $message: String!
    $flavorTop: String!
    $flavorMid: String!
    $flavorBot: String!
    $lollyPath: String!
  ) {
    createLolly(
      recipientName: $recipientName
      sendersName: $sendersName
      message: $message
      flavorTop: $flavorTop
      flavorMid: $flavorMid
      flavorBot: $flavorBot
      lollyPath: $lollyPath
    ) {
      message
      lollyPath
    }
  }
`









// mutation ka hai yeh

export default function Home() {
  const {loading,error,data}=useQuery(Graphql_Data)
  const [createLolly]=useMutation(createLollyMutation)
  const[c1,setC1]=useState("#d52358")
  const[c2,setC2]=useState("#e95946")
  const[c3,setC3]=useState("#deaa43")
  const To=useRef();
  const From=useRef()
  const TextArea=useRef();

  const Link=useRef();
  
 
  const OnSubmit=async()=>{
   await  createLolly({
      variables: {
        recipientName:To.current.value,
        sendersName:From.current.value,
        message:TextArea.current.value,
        flavorTop: c1,
        flavorMid: c2,
        flavorBot: c3,
        lollyPath:Link.current.value,
      },
    })

  

navigate(`/lollies/${Link.current.value}`)
  }
  if (loading)
  return <h2>Loading..</h2>

if (error) {
  console.log(error)
  return <h2>Error</h2>
}
 
console.log(data,"daata")

  
  return(
    <>



<div className="wrapper" style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>

<div className="container" style={{display:"flex"}}>
{/* lolly hai */}



<div>

<div><Lolly top={c1}  middle={c2}  bottom={c3} /></div>
<input type="color" value={c1} onChange={(e)=>setC1(e.target.value)}></input>
<input type="color" value={c2} onChange={(e)=>setC2(e.target.value)}></input>
<input type="color" value={c3} onChange={(e)=>setC3(e.target.value)}></input>
<button onClick={()=>OnSubmit()}>ON SUBMIT</button>
</div>



{/* lolly hai yeh */}
{/* form wala idher hai */}


<div style={{alignSelf:"center",width:"300px",justifySelf:"center",
height:"420px"}}>
<div  style={{marginTop:"20px",textAlign:"center"}}>
  <input placeholder="from" ref={From}></input>
</div>
<div>

  <div style={{marginTop:"20px",textAlign:"center"}}><textarea style={{height:"250px"}} 
   ref={TextArea}></textarea></div>
</div>
<div style={{marginTop:"20px",textAlign:"center"}}>  <input placeholder="TO" ref={To}></input></div>
<div style={{marginTop:"20px",textAlign:"center"}}>  
<input placeholder="add link " ref={Link}></input></div>
<div style={{marginTop:"20px",textAlign:"center"}}>

</div>
</div>

{/* form wala idehr hai */}

</div>

</div>







    </>
  )
}
