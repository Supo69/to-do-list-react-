import React from "react";
import './single-todo.css'
import {removeItem} from '../Cases'
import { updateItem } from "../Cases";

const SingleTodo = (todo) =>{
  const description = todo.description === '' ? '': 'description';

    return(
        <li key={todo.id} className="listItem">
            <h4 className="titleItem">{todo.title}</h4>
            <p className="timeDisplay">{todo.time}</p>
            <h5>{description}</h5>
            <p>{todo.description}</p>
            <h5>how many times:</h5>
            <p>{todo.steps}</p>
            <div className="right">
                <br/>
                <button className="deleteItem" onClick={()=>{
                    removeItem(todo.id);
                    setTimeout(()=>window.location.reload(true),1000)
                }}>delete item</button>

          
            </div>
            <hr/>
        </li>
    )

}


export default SingleTodo;