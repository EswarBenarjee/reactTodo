import React, {useState} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

var todos1 = [];
if(! (localStorage.eswartodos === undefined) ) {
    if(! (JSON.parse(localStorage.eswartodos).length === 0) ) {
        todos1 = JSON.parse(localStorage.eswartodos);
    }
};

function TodoList() {
    var [todos, setTodos] = useState(todos1);

    const addTodo = todo => {
        if (!todo.text || /^\s+$/.test(todo.test)) {
            return;
        }

        const todoList = [todo, ...todos];

        setTodos(todoList);
        localStorage.eswartodos = JSON.stringify(todoList);
    }

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s+$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        localStorage.eswartodos = JSON.stringify(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    }

    const completeTodo = id => {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) { 
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
        localStorage.eswartodos = JSON.stringify(updatedTodos);
    }

    const removeTodo = id => {
        const removedTodos = [...todos].filter(todo => todo.id !== id);
        
        setTodos(removedTodos);
        localStorage.eswartodos = JSON.stringify(removedTodos);
    }

    return(
        <div className='todo-list'>
            <h1>What are the plans for today?</h1>
            <TodoForm onSubmit={addTodo} placeholder='Add Todo'/>
            <div className={(Array.isArray(todos) && todos. length)? 'todo-rows-list' : ''}>
                <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
            </div>
        </div>
    );
}

export default TodoList;