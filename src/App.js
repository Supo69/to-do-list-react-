import React, { useEffect, useState } from "react";
import './App.css'
import Cases from "./Cases";
import {db} from './config/firebaseApp'
import { collection,getDocs } from "firebase/firestore";


function App() {
  const [currentFunction, setCurrentFunction] = useState("Today")
  const [open,setOpen] = useState(false)
  //useState for server
  const [data,setData] = useState('')
  //useEffect for server
  useEffect(()=>{
    
  },[])

  const test = "this is a test"
  console.log(test)
  useEffect(()=>{

    getRoutine()
    .then((items)=>{
      setData(items)
    })
   
   },[])
   

  const SidebarItem = ({title}) =>{

    return(
      <button onClick={() =>setCurrentFunction(title)}>
         <h1>{title}</h1>
      </button>
    )
  }


  const setDrawerOpen = ()=>{
    setOpen(true)
  }

  const setDrawerClose = ()=>{
    setOpen(false)
  }
  
  
  return (
    <div className="App">


      <header className="App-header">
        <div>
        <img src="" alt="logo"/>
          <h1>
            Supo's To Do List
          </h1>
        </div>

        <div>
          <img src="" alt="user"/>
          <p>user</p>
        </div>
       
      </header>

      <main>

      <div className="App-sidebar">
          <SidebarItem title="Today"/>
          <SidebarItem title="Special Events"/>
          <SidebarItem title="Routine"/>
          <SidebarItem title="Calendar"/>
          <SidebarItem title="Logout"/>
      </div>

      <div className="App-currentFunc">
        
        {Cases(currentFunction,data)}
      </div>
  

      </main>
     </div>
  );
}

//database



 //database ref
 const routineCollectionRef = collection(db, 'todos')


    
 const getRoutine = async() =>{
   //read the data
   //set the routine list
   try{
     const data = await getDocs(routineCollectionRef)
     const filteredData = data.docs.map((doc) =>({...doc.data(), id:doc.id}))      
     console.log(filteredData)
     return filteredData
   }catch(err){
     console.log(err)
   }

   }



export {routineCollectionRef}
export default App;
