import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./contexts/index";
import { TodoProvider } from "./contexts/ToDoContext";
import { useEffect } from "react";
import { TodoForm, TodoItem } from "./components";
function App() {
  const [todos, setTodos] = useState([]); //here todos contains all todos not any individual todo and in useState we are keeping by default empty array
  // because if we don't keep it it'll be null then it'll create a problem

  //  we have to keep the functions name same as it is in provider then only their functionality will inject.

  // every todo is an object
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]); //here todo is an individual todo so for adding we are adding in front of
    // previous todos(to take reference of prev todos using spread we are using callback) which are already existed.
  };

  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // ! Local Storage is just browser storage.
  // ! We are calling here useEffect because we want whenever page reloads it should fetch all todos previously stored.
  // ! Until we are in React we can access localStorage but if we are in server, then we can't access it directly like this.
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")); //from local storage values comes in strings but we want values in JSON
    // because only JSON can preserve the structure (JSON GIVES OBJECTS IN AN ARRAY IN JS)
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // ! We are using another useEffect so that if any new todo comes it should also set into localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }} //these are the values which TodoProvider will provide
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              // in this loop div will get repeated and to know every div is unique or not
              // so we use key for this purpose
              <div key={todo.id} className="w-full">
                {/* don't do mapping using index instead use unique ids because if any value gets deleted then we 
              have to restructure every key but if they are unique ids then only that element will go */}
                <TodoItem todo={todo} />
                {/* we have to pass a component prop in this */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
