import React, { useEffect, useRef, useState } from 'react'
import { Todo } from "../models/Todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface Props {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todoList, setTodoList }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todoInput);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, todoInput: editTodo } : todo)));
    
    setEdit(false);
  }

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  const handleDone = (id: number) => {
    setTodoList(todoList.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone } : todo));
  }

  return (
    <form className='todoSingle' onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todoSingle--text"
        />
      ) : todo.isDone ? (
        <s className="todoSingle--text">{todo.todoInput}</s>
      ) : (
        <span className="todoSingle--text">{todo.todoInput}</span>
      )}
      <div>
        <span className='icon' onClick={() => {
          if(!edit && !todo.isDone) setEdit(!edit);
        }}>
          <AiFillEdit />
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo