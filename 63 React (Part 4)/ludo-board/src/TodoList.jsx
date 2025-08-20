import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
    let [todos, setTodos] = useState([{task : "sample task" , id: uuidv4()}]);
    let [newToDo, setNewToDo] = useState("");

    let addNewTask = () => {
        setTodos((previousTodos)=> {
            return [...previousTodos , { task:newToDo, id:uuidv4() }];
        });
        setNewToDo("");              
    }

    let updateTodoValue = (event) => {
        console.log(event.target.value);
        setNewToDo(event.target.value);
    }

    return (
        <div>
            <input type="text" placeholder="add a task" 
            value={newToDo}
            onChange = {updateTodoValue}
            ></input>
            <button onClick={addNewTask}>Add Task</button>
            <br/><br/><br/><br/>

            <hr/>
            <h4>ToDo List</h4>
            <ul>
            {
                todos.map((todo) => (
                    <li key={todo.id}>{todo.task}</li>
                ))
            }
            </ul>
        </div>
    );
}