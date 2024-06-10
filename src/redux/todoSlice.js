import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: localStorage.getItem("myTodos")
    ? JSON.parse(localStorage.getItem("myTodos"))
    : [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        todo: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      localStorage.setItem("myTodos", JSON.stringify(state.todos));
    },

    removeTodo: (state, action) => {
      // console.log("remove from redux", action.payload);
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
      localStorage.setItem("myTodos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const searchTodo = state.todos.find((todo) => todo.id === id);
      if (searchTodo) {
        searchTodo.todo = updatedTodo;
      }

      localStorage.setItem("myTodos", JSON.stringify(state.todos));
    },
    checkingcheckBox: (state, action) => {
      const id = action.payload;
      const searchTodo = state.todos.find((todo) => todo.id === id);
      if (searchTodo.completed === false) {
        searchTodo.completed = true;
      } else {
        searchTodo.completed = false;
      }
      // console.log("Completed", searchTodo.todo, searchTodo.completed);
      localStorage.setItem("myTodos", JSON.stringify(state.todos));
    },
    reorderTodos: (state, action) => {
      state.todos = action.payload;
      localStorage.setItem("myTodos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, removeTodo, editTodo, checkingcheckBox, reorderTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
