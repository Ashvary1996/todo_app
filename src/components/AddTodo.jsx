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
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600 text-center mb-6">
        My Todo List
      </h1>

      <form
        onSubmit={handleTodo}
        className="flex flex-col sm:flex-row items-center gap-4 justify-center"
      >
        <div className="relative w-full sm:w-3/4 md:w-2/3">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full py-3 px-4 rounded-lg   text-base sm:text-lg border  bg-blackborder-gray-300 focus:outline-none bg-slate-50 focus:ring-2 focus:ring-yellow-500 bg-opacity-80 text-center text-orange-900 font-semibold 
            focus:bg-white
            "
            placeholder="Add your todo..."
            value={input}
            maxLength={100}
            list="sampleLists"
          />
          
          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="absolute right-2 top-3.5   transform -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none   "
            >
              ✖
            </button>
          )}
          <datalist id="sampleLists">
            <option value="Review and approve employee reports" />
            <option value="Check emails and respond to urgent messages" />
            <option value="Grocery shopping" />
            <option value="Review monthly budget" />
          </datalist>
        </div>

        <button
          type="submit"
          className="py-2 px-4 sm:px-6 bg-amber-700 text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg transition duration-300 hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!input}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
