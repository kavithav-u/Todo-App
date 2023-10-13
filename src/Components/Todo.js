import React from 'react'
import './Todo.css';
import {useState , useRef, useEffect} from 'react';
import { MdDoneAll } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { LuDelete } from 'react-icons/lu';


function Todo() {
  const [todo, setTodo ] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [ deleteMessage, setDeleteMessage] = useState('');


 const handleSubmit= (e) =>{
  e.preventDefault();
 }

 const addTodo = () => {
  if (todo.trim() === '') {
    setDeleteMessage('Please enter a task');
    setTimeout(() => {
      setDeleteMessage('');
    }, 1000);
  } else if (todos.some((item) => item.list === todo)) {
    setDeleteMessage('Task already exists');
    setTimeout(() => {
      setDeleteMessage('');
    }, 1000);
    } else {
    setTodos([...todos, {list:todo, id :Date.now(), status :false }]);
    console.log(todos);
    setTodo('');
  }
  if (editId) {
    const editTodo = todos.find((todo)=>todo.id === editId);
    const updateTodo = todos.map((to)=>to.id===editTodo.id
    ? (to = {id: to.id ,list : todo })
    : (to = {id : to.id , list : to.list}))
    setTodos(updateTodo);
    setEditId(0);
    setTodo('');
  }
}
 ;

  const inputRef = useRef('null');

  useEffect(()=>{
    inputRef.current.focus();
  })
  const onDelete = (id) => {
    setTodos((prevTodos) => {
      const filteredTodos = prevTodos.filter((to) => to.id !== id);
      const deletedCount = prevTodos.length - filteredTodos.length;
      const message = deletedCount === 1 ? 'Deleted' : 'All data deleted';
      setDeleteMessage(message);
      setTimeout(() => {
        setDeleteMessage('');
      }, 1000);
  
      return filteredTodos;
    });
  };
  

  const onComplete =(id) =>{
   let complete = todos.map((list)=>{
    if(list.id === id){
      return ({...list , status : !list.status})
    }
    return list
   })
   setTodos(complete)
  }

  const onEdit = (id)=>{
   const editTodo = todos.find ((data)=>data.id === id);
   setTodo(editTodo.list);
   setEditId(editTodo.id)
  }


  return (
    <div className='container'>
        <h2> TODO APP</h2>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" value={todo} ref={inputRef} placeholder='Enter your tasks' className='form-control' onChange={(event)=>setTodo(event.target.value)}/>
            <button onClick={addTodo} title='Add or task'>{editId ? 'EDIT' : 'ADD'}</button>
        </form>
    <div className='list'>
        <ul>
            {
              todos.map((data)=>(
                <li className='list-items'>
                  <div className='list-item-list' id= {data.status ? 'list-item' : ""} >{data.list}</div>
                <span>
                  <MdDoneAll className='list-items-icons' id='complete' title='complete' onClick={()=>onComplete (data.id)}/>
                  <AiFillEdit className='list-items-icons' id='edit' title='edit' onClick={()=> onEdit(data.id)}/>
                  <LuDelete className='list-items-icons' id='delete' title='delete' onClick={()=>onDelete(data.id)}/>
                  </span>
                  </li>
              ))
            }
              <p id='error'>{deleteMessage}</p>
        </ul>
    </div>

    </div>
  )
}

export default Todo