import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editTodo } from "../redux/todoSlice";
import { toast } from "react-toastify";

function EditTodo() {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos);
  const selectedTodo = todos.find((todo) => todo.id === id);
  const [updatingTodo, setUpdatingTodo] = useState(selectedTodo.todo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodo({ id, updatedTodo: updatingTodo }));
    navigate("/");
    toast.info(`Todo Updated: ${updatingTodo.slice(0, 12)}`, {
      pauseOnFocusLoss: false,
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="m-auto mt-10 w-full max-w-lg">
      <h1 className="text-3xl text-amber-700 font-semibold mb-5">
        Edit Selected Todo
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full rounded-lg text-blue-950 text-center text-2xl focus:outline-yellow-500 p-3 my-5 resize-none overflow-hidden"
          type="text"
          name="todo"
          value={updatingTodo}
          onChange={(e) => {
            setUpdatingTodo(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <button
          disabled={updatingTodo === selectedTodo.todo}
          className={`w-[98%]  p-3 rounded-lg font-semibold text-xl transition duration-300 ${
            updatingTodo === selectedTodo.todo
              ? "cursor-not-allowed bg-gray-600"
              : "hover:bg-red-700 bg-red-600 "
          }`}
        >
          Update
        </button>
        <Link
          to="/"
          className="w-[98%]  m-auto block mt-3 bg-green-600 p-3 rounded-lg font-semibold text-xl transition duration-300 hover:bg-green-700"
        >
          Go Back
        </Link>
      </form>
    </div>
  );
}

export default EditTodo;
