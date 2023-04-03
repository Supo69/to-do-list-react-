import React from "react"
import SingleTodo from "../single-todo/single-todo"


const ManageRoutine = (display,data) =>{
  

    const parse = (items) =>{
      const parsedData = []

      for(let element in items){
        for(let day in items[element].repetition){
          const repDay = items[element].repetition[day] 
          if(display === 'the default'){
            if(repDay === ''){
              break;
            }else if(repDay ==='sun'){
              parsedData.push(items[element])
              break;
            }
          }else{
            if(repDay === display){
              parsedData.push(items[element])
              break;
            }
          }
        }
        
      }
      return parsedData
    }

    const parsedData = parse(data)

    switch(display){
      
      case 'the default':
        return(
          <>
          <h2>This is {display} routine</h2>
          <p>things to do:</p>
          <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
          </>
        )

      case 'mon':
        return(
          <>
          <h2>This is {display}day routine</h2>
          <p>things to do:</p>
          <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
          </>
        )

      case 'tue':
      return(
        <>
        <h2>This is {display}sday routine</h2>
        <p>things to do:</p>
        <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
        </>
      )

      case 'wed':
        return(
          <>
          <h2>This is {display}nesday routine</h2>
          <p>things to do:</p>
          <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
          </>
        )

      case 'thu':
        return(
          <>
          <h2>This is {display}rsday routine</h2>
          <p>things to do:</p>
          <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
          </>
        )

      case 'fri':
        return(
          <>
          <h2>This is {display}day routine</h2>
          <p>things to do:</p>
          <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
          </>
        )
        
      case 'sat':
        return(
          <>
          <h2>This is {display}urday routine</h2>
          <p>things to do:</p>
          <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
          </>
        )
      
        case 'sun':
          return(
            <>
            <h2>This is {display}day routine</h2>
            <p>things to do:</p>
            <ul>
           {
            parsedData.map((todo) =>{
              return SingleTodo(todo)
            })
           }
          </ul>
            </>
          )

      default:
        return;
    }
    
}


export default ManageRoutine;