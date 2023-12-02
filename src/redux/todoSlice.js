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
      };
      state.todos.push(newTodo);
      localStorage.setItem("myTodos", JSON.stringify(state.todos));
    },

    removeTodo: (state, action) => {
      console.log("remove from redux", action.payload);
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
      localStorage.setItem("myTodos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {},
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
