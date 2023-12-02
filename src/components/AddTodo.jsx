import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleTodo = () => {
    dispatch(addTodo(input));
  };

  return (
    <div>
      <h1 className="text-teal-400">Todo App</h1>
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="text-center rounded-lg"
          placeholder="add todo"
        />
        <button
          className={`bg-red-800 rounded-sm ml-2  p-1   ${
            !input ? "hover:text-slate-500 " : "hover:text- hover: font-bold"
          }`}
          onClick={handleTodo}
          disabled={!input}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
