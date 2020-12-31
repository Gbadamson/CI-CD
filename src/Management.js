import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from "uuid"
import app from './basement'

const db = app.firestore().collection("Managers")

function Management() {
  const [duty, setDuty] = useState("")
  const [who, setWho] = useState("")
  const [imgFile, setImgFile] = useState(null)
  const [taker, setTaker] = useState([])

  const [dinput, setDinput]=useState(false)
  const outer =()=>{
    setDinput(!dinput)
  }

  const Loader = async(e)=>{
    const File = e.target.files[0]
    const Storage = app.storage().ref()
    const FileRef = Storage.child(File.name)

    await FileRef.put(File)
    setImgFile(await FileRef.getDownloadURL())
  }

  const backLink = async()=>{
    await db.doc().set({
      task: duty,
      dealer: who,
      pix: await imgFile,
      id: uuidv4()
    })
  }

  const fetcher = async()=>{
    await db.onSnapshot((snapshot)=>{
      const item = []
      snapshot.forEach(doc=>{
        item.push({...doc.data(), id: doc.id})
      })
      setTaker(item)
    })
  }

  const removeFile = async(id)=>{
    if(window.confirm("Do you want to do this?")){
      await db.doc(id).delete()
    }
  }
  
  const editted = async(id)=>{
    const lab = prompt()
    await db.doc(id).update({duty: lab})
  }


  useEffect(()=>{
    fetcher();
  }, [])

  return (
    <div Body>
      <div style={{display: "flex", flexDirection: "column", width: "100vw"}}>
        <div style={{display:"flex", justifyContent:"space-between",
      height: 70, backgroundColor: "lightgreen", alignItems:"center",
      paddingLeft: 25, paddingRight: 25, position: "sticky", top: 0
      }}>
          <div style={{height: 50, width: 250, display: "flex", alignItems:"center"}}>
          <h2 style={{color: "white", fontFamily:"poppins"}}>Management App</h2>
        </div>
          <div onClick={outer} 
          style={{height: 40, width: 40, backgroundColor:"lightpink", cursor:"pointer",
        borderRadius:"50%", justifyContent:"center", alignItems:"center", display:"flex"
        }}><p style={{color: "white"}}>+</p></div>
        </div>
        <div style={{height:200, width:"100vw", borderRadius:5,
        display:"flex", flexDirection:"column"
      }}>
          

     
          {
            taker.map(({id, task, dealer, pix})=>(
              <div style={{display: "flex", justifyContent: "space-evenly", height: "70%",
              backgroundColor:"white", margin: 20, borderRadius: 5, boxShadow:"0px 5px 5px 0px lightblue"
              }}>
                  <div style={{width:"23%", height:"75%" ,borderRadius:"50%",
                  marginTop: 15
                }}>
                  <img src={pix} alt="som" 
                  style={{height: "100%", width:"100%", objectFit:"cover", borderRadius:"50%"}}/>
                </div>
                  <div style={{width: "60%", height: "75%", borderRadius:5,
                marginTop: 15
                }}>{task}</div>
                <div style={{display:"flex"}}>
          <div onClick={()=>{editted(id)}}
           style={{height: 40, width: 40, backgroundColor:"lightpink", cursor:"pointer",
        borderRadius: 5, justifyContent:"center", alignItems:"center", display:"flex", marginLeft: 25}}>
          📓
        </div>
          <div onClick={()=>{removeFile(id)}}
           style={{height: 40, width: 40, backgroundColor:"lightpink", cursor:"pointer",
        borderRadius: 5, justifyContent:"center", alignItems:"center", display:"flex", marginLeft: 25}}>
          ❌
        </div>
          </div>
                </div>
            ))
          }
   


          
        </div>
        {
         dinput?<div style={{display:"flex", flexDirection:"column", width: "50%", margin:40, padding: 20,
         backgroundColor:"lightcoral", borderRadius: 5}}>
          <input style={{marginBottom:5}}
          type="file" onChange={Loader}/>
          <input style={{marginBottom:5, outline:"none", border:"none", height: 20}}
          type="text" value={duty} onChange={(e)=>{setDuty(e.target.value)}} placeholder="task"
          />
          <input style={{marginBottom:5, outline:"none", border:"none", height: 20}}
          type="text" value={who} onChange={(e)=>{setWho(e.target.value)}} placeholder="who to do it?"
          />
          <div style={{height:30, width:60, backgroundColor:"lightgreen"}}>
          <button onClick={backLink}
          style={{backgroundColor:"none", outline:"none", border:"none", borderRadius: 5,
          height:"100%", width:"100%"
        }}>Submit</button>
          </div>
        </div>: null
        }
      </div>


      <div></div>
    </div>
  )
}

export default Management
