import React, { useRef } from 'react'
import "./styles.css"

interface Props {
  todoInput: string;
  setTodoInput: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({ todoInput, setTodoInput, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <form className='input' onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur(); // Removes blur/darken of screen
      }}>
      <input
        ref={inputRef}
        type="input" 
        value={todoInput} 
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder='Enter a task' 
        className='inputBox'
      />
      <button className='inputSubmit' type="submit">
        GO
      </button>
    </form>
  )
}

export default InputFeild
