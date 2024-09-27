import React, { useEffect, useRef, useState } from 'react';
import todo_icon from "../assets/todo_icon.png";
import Todoitems from './Todoitems';

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const inputRef = useRef(); 

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") {
            return null;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => prevTodos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isComplete: !todo.isComplete };
            }
            return todo;
        }));
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-lg md:max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg'>
            {/* title */}
            <div className="flex items-center mt-7 gap-2 ">
                <img className='w-8 ' src={todo_icon} alt="todo icon" />
                <h1 className='text-2xl md:text-3xl font-semibold'>To-Do List</h1>
            </div>

            {/* input box */}
            <div className="flex items-center my-7 rounded-full bg-gray-200">
                <input 
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none flex-1 h-12 md:h-14 pl-4 md:pl-6 pr-2 placeholder:text-slate-600 text-base md:text-lg'
                    type="text"
                    placeholder='Add your task'
                />
                <button 
                    onClick={add} 
                    className='border-none rounded-full bg-orange-600 w-24 h-12 md:w-32 md:h-14 text-white text-base md:text-lg font-medium cursor-pointer'>
                    ADD +
                </button>
            </div>

            {/* todo list */}
            <div className="overflow-y-auto max-h-[300px] md:max-h-[400px]">
                {todoList.map((item, index) => (
                    <Todoitems
                        key={index}
                        text={item.text}
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
}

export default Todo;
