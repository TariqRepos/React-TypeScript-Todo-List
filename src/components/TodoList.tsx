import React from 'react'
import { Todo } from "../models/Todo"
import SingleTodo from './SingleTodo';

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todoList, setTodoList}) => {
  return (
    <div className='todos'>
      {todoList.map((todo) => (
        <SingleTodo 
          key={todo.id}
          todo={todo}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </div>
  )
}

export default TodoList