import React, {useState} from 'react';
import TodoForm from './TodoForm';
import { FiEdit } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        })
    }

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} placeholder='Update Todo'/>
    }

    return todos.map((todo, index) => {
        return <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div className='todo-text' key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className='todo-icons'>
                <FiEdit className='edit-icon' onClick={() => setEdit({id: todo.id, text:todo.text})}/>
                <RiCloseLine className='delete-icon' onClick={() => removeTodo(todo.id)}/>
            </div>
        </div>
    });
};

export default Todo;