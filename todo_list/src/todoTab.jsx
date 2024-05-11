import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import "./Todo.css";


export default function Todo(){

    const [Todos,setTodos] = useState([{task:"Sample Task",isDone:false,id:uuidv4()}]);
    const [Newtask,setNewtask] = useState("");

    let NewTask = () => {
      setTodos([...Todos,{task:Newtask,isDone:false,id:uuidv4()}])
    }

    let UpdateTask = (event) => {
       setNewtask(event.target.value);
    }
    
    let DeleteTodo= (id) => {
        setTodos(Todos.filter((todo) => todo.id != id));
    }

    let toUppercase = () => {
        setTodos(Todos.map((todo)=>{
           return {
            ...todo,
            task:todo.task.toUpperCase(),
           }
        }));
    }

    let UpdateOne = (id) => {

        setTodos((prevTodos) => {

          return prevTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, task: todo.task.toUpperCase() };
            } else {
              return todo;
            }
          });
        });
      };
    
      let Done = () => {
        
        setTodos(Todos.map((todo) => {
            return {
                ...todo,
                isDone:true,
            }
        }))
      }
    return (
        <>

       <h1>Todo List</h1>

       <div className="Todo_contant">
       <input type="text" name="text" className="input" placeholder="Enter Task" onChange={UpdateTask}/>
       <Button variant="contained" size="medium" onClick={NewTask}>Add Task</Button>
       </div>
       
        <h1>Task List</h1>
        <div className="Todo_list">
            <ol type="1">
                {
                    Todos.map((tasks) => (
                        <li key={tasks.id}>
                        <span style={tasks.isDone ? {textDecorationLine:"line-through", color:"gray"} : {}}>
                        {tasks.task}</span>
                        &nbsp;&nbsp;&nbsp;
                       
                       <Button variant="outlined" startIcon={<DeleteOutlinedIcon />} onClick={() => DeleteTodo(tasks.id)} style={{color:"black",border:"2px solid black"}}> Delete</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="contained" size="medium" onClick={() => UpdateOne(tasks.id)}>UpperCase</Button>
                        <br></br><br></br>
                        </li>
                        
                    ))
                }
            </ol>
           
        </div>
        <br></br>
        
        <Button variant="contained" size="medium" onClick={toUppercase}>
        UpperCase All
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" size="medium" onClick={Done}>
        Mark All As Done
        </Button>

        </>
    );
}