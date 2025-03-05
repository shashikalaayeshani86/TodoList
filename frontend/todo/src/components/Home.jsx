import React, { useEffect, useState } from 'react'
import axios from 'axios'

const api = "http://localhost:8080/api/todos"

const Home = () => {

  const [title,setTitle] = useState('');
  const [todos,setTodos] = useState([]);

  useEffect(()=>{
    fetchAllTodos();
  },[]);

  const createTodo = async ()=>{
    const todo = {title}
   
    try{
      const {data} = await axios.post(`${api}`,todo)
      setTodos([...todos,data])
      console.log(data)
    }catch(error){
      console.log("catch error:" ,error)
    }
  }

  const fetchAllTodos = async ()=>{
    
   
    try{
      const {data} = await axios.get(`${api}`)
      setTodos(data)
      console.log("all todos",data)
    }catch(error){
      console.log("catch error:" ,error)
    }
  }

  const deleteTodo = async (id)=>{
    const todo = {title}
   
    try{
      const {data} = await axios.delete(`${api}/${id}`)
      setTodos(todos.filter(todo=>todo.id!==id));
      console.log("Deleting todo id:",id)
    }catch(error){
      console.log("catch error:" ,error)
    }
  }

  return (
    <div className='backo'>
      <div className='topo'>
        <input 
          type='text' 
          placeholder='Add a new note'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <button onClick={createTodo}>ADD</button>
      </div>
      <p className='middo'> Todo List</p>
      <div className='boto'>

      {todos.map((item, index) => (
  <div className="boto-p" key={item.id}>
    <p>
      {index + 1}. {item.title}  {/* Display actual todo title */}
      <button onClick={()=>deleteTodo(item.id)}>Delete</button>
    </p>
    
  </div>
))}

        
        </div>
    </div>
  )
}

export default Home
