import React, { useState, useRef, useEffect } from "react";
import "./TodoApp.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function TodoApp() {
  const inputRef = useRef();

  const [todo, setTodo] = useState("");
  // store datas
  const [todos, setTodos] = useState([]);

  const [editId,setEditId]=useState(0)

  const addTodos = () => {
    if (todo !== '') {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
      console.log(todos);
   }

    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId)
      const updateTodo = todos.map((to) => to.id === editTodo.id ? (to = { id: todo.id, list: todo }) : (to = { id: todo.id, list: to.list }))
      setTodos(updateTodo)
      setEditId(0)
      setTodo('')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    
    setTodos(todos.filter((to) => to.id !== id));
    
  }
  const onComplete = (id) => {
    let complete = todos.map((item) => {
      if (item.id === id) {
        return ({...item,status:!item.status})
      }
      return item
    })

    setTodos(complete)
  
}

  const onEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }
  return (
    <div className="container">
      <h1>Todo App</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter your tasks"
          value={todo}
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
        />

        <button onClick={addTodos}>{editId?'EDIT':'ADD' }</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((data, index) => (
            <li key={index} className="list-items">
              <div className="list-item-list" id={data.status ? 'list-item':''}>{data.list}</div>

              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="complete"
                  onClick={() => onComplete(data.id)}
                />
                <FiEdit className="list-item-icons" id="edit" title="edit" onClick={()=>onEdit(data.id)} />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="delete"
                  onClick={() => onDelete(data.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
