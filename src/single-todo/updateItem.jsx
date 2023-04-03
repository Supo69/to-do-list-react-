import React from "react";
import { updateItem } from "../Cases";

const UpdateItem = () =>{

    return(
        <form>

            <h4>update item form</h4>
            <p>leave blank for no changes</p>
            <h5>set the new title</h5>
            <input type="text"/>
            <h5>set the new description</h5>
            <input type="text"/>
        </form>
    )

}

export default UpdateItem