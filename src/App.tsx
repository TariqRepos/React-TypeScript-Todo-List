import React, { useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import TodoList from './components/TodoList';
import { Todo } from './models/Todo';

const App: React.FC = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todoInput) {
      setTodoList([...todoList, { id: Date.now(), todoInput, isDone: false }]);
      setTodoInput("");
    }
  }

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputFeild todoInput={todoInput} setTodoInput={setTodoInput} handleAdd={handleAdd} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default App;
