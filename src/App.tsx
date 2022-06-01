import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models/Todo';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [completedList, setCompletedList] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todoInput) {
      setTodoList([...todoList, { id: Date.now(), todoInput, isDone: false }]);
      setTodoInput("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {source, destination } = result;
    
    // Moved out of bounds
    if (!destination) return;

    // Didnt change place/list
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    let add;
    let active = todoList;
    let complete = completedList;
    
    // Source Logic
    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedList(complete);
    setTodoList(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField todoInput={todoInput} setTodoInput={setTodoInput} handleAdd={handleAdd} />
        <TodoList 
          todoList={todoList} 
          setTodoList={setTodoList}
          completedList={completedList}
          setCompletedList={setCompletedList}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
