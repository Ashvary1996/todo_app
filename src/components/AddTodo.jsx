import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { toast } from "react-toastify";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a todo.");
      return;
    }
    dispatch(addTodo(input));
    setInput("");
    toast.success(`Todo Added: ${input.slice(0, 12)}...`, {
      pauseOnFocusLoss: false,
    });
  };

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-10">
      <h1 className="text-4xl font-bold text-yellow-600 mb-6">My Todo List</h1>

      <form onSubmit={handleTodo} className="flex items-center">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="flex-1 py-3 px-4 rounded-lg  text-gray-800 text-lg border border-gray-300 focus:outline-none focus:border-yellow-500 text-center bg-neutral-100 "
          placeholder="Add your todo..."
          value={input}
          maxLength={100}
        />
        <button
          type="submit"
          className={`ml-4 py-3 px-6 bg-amber-700  text-white text-xl font-semibold rounded-lg transition duration-300 hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed`}
          disabled={!input}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
