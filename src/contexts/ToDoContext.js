import { createContext, useContext } from "react";

// ! Context API is a state management library and it is not for big projects
export const TodoContext = createContext({
  // these all are default properties in this context

  // In Context API's we just declare methods in definition of context we don't declare its functionality
  // but this is not the case in Redux
  todos: [{ id: 1, todo: "Todo msg", completed: false }],
  addTodo: (todo) => {},
  updatedTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

// ! We are not making any other file for provider,we are doing it here only

export const useTodo = () => {
  return useContext(TodoContext); //whenevr use useContext function always give context of something to it otherise it'll give error
};

export const TodoProvider = TodoContext.Provider;
