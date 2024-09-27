import React from 'react';
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => toggle(id)} className="flex flex-1 items-center cursor-pointer">
        <img 
          src={isComplete ? tick : not_tick} 
          alt="toggle complete" 
          className='w-5 md:w-7' 
        />
        <p 
          className={`text-slate-700 ml-4 text-[15px] md:text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`}
        >
          {text}
        </p>
      </div>
      
      <img 
        onClick={() => deleteTodo(id)} 
        src={delete_icon} 
        alt="delete todo" 
        className='w-4 md:w-5 cursor-pointer' 
      />
    </div>
  );
}

export default Todoitems;
