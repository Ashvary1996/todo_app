import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { toast } from "react-toastify";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
    toast.success(`Todo Added: ${input.slice(0,12)}...`,{
      pauseOnFocusLoss: false
    });
  };

  return (
    <div className="mt-2 p-1">
      <h1 className="text-teal-400 text-3xl font-bold mb-4">my-Todo App</h1>
      <form onSubmit={handleTodo}>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="text-center rounded-lg w-[40%] p-1 bg-slate-600 text-white text-lg border-none"
          placeholder="add your todo..."
          value={input}
          maxLength={100}
        />
        <button
          className={`bg-red-800 rounded-lg ml-2  p-1 text-2xl   ${
            !input
              ? "hover:text-slate-500 "
              : "hover:text- hover: font-semibold hover:bg-green-600"
          }`}
          disabled={!input}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
