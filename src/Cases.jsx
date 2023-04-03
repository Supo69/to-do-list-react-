import ManageRoutine from "./ManageRoutine/ManageRoutine";
import React,{ useState} from "react";
import {addDoc,deleteDoc,updateDoc,doc} from 'firebase/firestore'
import { routineCollectionRef } from "./App";
import "./Cases.css"
import {db} from './config/firebaseApp'
import {Slider} from 'antd'


const Cases = (type,data) =>{
  
  //useState to set the function displayed
  const [display, setDisplay] = useState(' ');

  //useState for new Item
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [repetition,setRepetition] = useState(["","","","","","",""])
  const [time,setTime] = useState('')
  const [steps,setSteps] = useState(0)

  //useState to complete items
  const [completed,setCompleted] = useState(false)

  //useState for the drawer
  const [open,setOpen] = useState(false)

  //function to update elements in the repetition array
  const repetitionUpdate = (name,index) =>{
    const cloneArray = repetition
    cloneArray[index] = name;
    setRepetition(cloneArray)
  }





  //vars for the workspace
  const currentDate = new Date();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const allWeekDays = ["sun","mon","tue","wed","thu","fri","sat"]
  const weekDay = allWeekDays[currentDate.getDay()]

  //function to parse the data for TODAY
  const parse = () =>{
    const parsedData = []

    for(let element in data){

      for(let day in data[element].repetition){ 
        if(data[element].repetition[day] === weekDay){
          parsedData.push(data[element])
          break;
        }
      }
    }

    return parsedData
  }

  const parsedData = parse() 
  


  
 //new item component
 const NewItemComponent = () =>{
  return(
    <>
    <h1>Add new item</h1>
    <div className="days">
      Repetition:
      <input type='checkbox' className="mon" onChange={(e) => repetitionUpdate((e.target.checked ? e.target.className:""),0)}/>M
      <input type='checkbox' className="tue"onChange={(e) => repetitionUpdate((e.target.checked ? e.target.className:"") ,1)}/>T
      <input type='checkbox' className="wed"onChange={(e) => repetitionUpdate((e.target.checked ? e.target.className:""),2)}/>W
      <input type='checkbox'className="thu" onChange={(e) => repetitionUpdate((e.target.checked ? e.target.className:""),3)}/>T
      <input type='checkbox' className="fri"onChange={(e) => repetitionUpdate((e.target.checked ? e.target.className:""),4)}/>F
      <input type='checkbox'className="sat" onChange={(e) => repetitionUpdate((e.target.checked ? e.target.className:""),5)} />S
      <input type='checkbox'className="sun" onChange={(e) => repetitionUpdate((e.target.checked ? e.target.className:""),6)}/>S

      <br/>
      
      <input type="time" value={time} onChange={(e)=>setTime(e.target.value)}/>
      <button onClick={()=>setTime('')}>remove time</button>

      <br/>

      <input type='text' placeholder='title of the item' className="title" onChange={(e) =>setTitle(e.target.value)}/>

      <br/>

      <input type='text' placeholder='description of the item' className="description" onChange={(e)=>setDescription(e.target.value)}/>

      <br/>
      
      <input type="number"  placeholder="how many times?" onChange={(e)=>setSteps(e.target.value)}/>

      <br/>

      <input className="submit" type="submit" value="submit" onClick={()=>{
        addNewItem(title,description,repetition,time,steps)
        setTimeout(()=>window.location.reload(true),1000)
        }}/>

    </div>
    </>
  )
 }





 //DIFFERENT APPS
   
  
    switch(type){
  
      case 'Today':
        return(
          <>
          <h1>{type}'s business</h1>
          <h4>{weekDay + ', ' + month[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear()}</h4>
          <hr/>
          <div>
            things to do:
            <br/>
            {parsedData.map((todo)=>{
              return (
               <div className="TodayToDo" style={{
                backgroundColor: completed ? 'white' : 'lightgray',
                position:'relative'
               }}>
                <h4>{todo.title}</h4>
                <p>{todo.time}</p>
                <Slider className="slider" max={todo.steps}/>
                <hr/>
                <p>{todo.description}</p>
                <hr/>
               </div>
            )})}
          </div>
          </>
        )
      case 'Special Events':
        return(
          <>
          <h1>This is {type}</h1>
          <p>here you can see and add all your special events.</p>
          <hr/>
          </>
        )
      case 'Routine':
    
        return(
          <>
          <h1>set up your own {type}</h1>
          <hr/>
          <button onClick={() =>setDisplay('the default')}>Default</button>
          <button onClick={() =>setDisplay('mon')}>M</button>
          <button onClick={() =>setDisplay('tue')}>T</button>
          <button onClick={() =>setDisplay('wed')}>W</button>
          <button onClick={() =>setDisplay('thu')}>T</button>
          <button onClick={() =>setDisplay('fri')}>F</button>
          <button onClick={() =>setDisplay('sat')}>S</button>
          <button onClick={() =>setDisplay('sun')}>S</button>
          <hr/>
  
          <button className="newItemDisplay" onClick={() =>{
             setDisplay('+')
          }}>+</button>
  
          <div className="workArea" style={{overflow: 'auto',height:'375px', position:'relative'}}>
            {display === '+' ? NewItemComponent(): ManageRoutine(display,data)}
          </div>
  
  
          </>
        )
      case 'Calendar':
        return(
          <>
          <h1>This is {type}</h1>
          <p>here you can see your Routine all in one.</p>
          <hr/>

          <div className="month">
            <ul>
              <li className="prev">&#10094;</li>
              <li className="next">&#10095;</li>
              <li>
                {month[currentDate.getMonth()]}
               <br/>
               <span>
                {currentDate.getFullYear()}
               </span>
              </li>
            </ul>
          </div>
          </>
        ) 
      case 'Logout':
        return(
          <>
          <h1>this is {type}</h1>
          </>
        )
      default:
        return(
          <h1>uknown function</h1>
        )
        
    }
  }
 

//functions to add and remove data to the server

const addNewItem = async(titleValue,descriptionValue, repetitionValue,timeValue,stepsValue) =>{

  try {
    await addDoc(routineCollectionRef,{
      title:titleValue,
      description:descriptionValue,
      repetition:repetitionValue,
      time:timeValue,
      steps:stepsValue
    })
    .then(data => {console.log(data.id +repetitionValue + titleValue +descriptionValue)})
  } catch (error) {
    console.error(error)
  }


 }


 const removeItem = async(id) =>{
try {
    const todoDoc = doc(db,"todos",id)
    await deleteDoc(todoDoc)
} catch (error) {
  console.error(error)
}
 }

 const updateItem = async(todo,newTitle,newDescription,newTime,newRepetition) =>{

  const updatedTitle = newTitle === '' ? todo.title : newTitle;
  const updatedDescription = newDescription === '' ? todo.description : newDescription;
  const updatedTime = newTime === '' ? todo.time : newTime;
  const updatedRepetition = newRepetition === '' ? todo.repetition : newRepetition;

  const itemDoc = doc(db,"todos",todo.id)
  await updateDoc(itemDoc,{
    title:updatedTitle,
    description:updatedDescription,
    repetition:updatedRepetition,
    time:updatedTime
  })
 }


 export {updateItem}
  export {removeItem}
  export default Cases;