import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from "../models/Todo"
import SingleTodo from './SingleTodo';

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedList: Todo[];
  setCompletedList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todoList, setTodoList, completedList, setCompletedList}) => {
  return (
    <div className="container">
      <Droppable droppableId='TodoList'>
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
          <span className='todosHeading'>Active Tasks</span>
          {todoList?.map((todo, index) => (
            <SingleTodo
              key={todo.id}
              index={index}
              todo={todo}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          ))}
          {provided.placeholder}
        </div>
        )} 
      </Droppable>

      <Droppable droppableId='CompletedList'>
        {(provided, snapshot) => (
          <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
          <span className='todosHeading'>Completed Tasks</span>
            {completedList?.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                index={index}
                todo={todo}
                todoList={completedList}
                setTodoList={setCompletedList}
              />
            ))}
            {provided.placeholder}
          </div>
        )} 
      </Droppable>
    </div>
  )
}

export default TodoList