import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts";
function TodoForm() {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;
    // addTodo({id:Date.now(),todo:todo,completed:false});

    // !Here we are not using above method because id we are passing in main.jsx i.e. Date and second parameter todo:todo,
    // !we are writing todo only because in new syntax if both field and value are having same name then we can just write todo.
    addTodo({ todo, completed: false }); //we can't assign just todo while giving to addTodo we have to pass an objec of todo in it
    // because in App.jsx where we have defined functionality of addTodo there we are spreading todo object.
    setTodo("");
  };
  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo} // this is known as wiring (wiring of input and state)
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        cl
        assName="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
