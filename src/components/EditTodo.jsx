import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTodo } from "../redux/todoSlice";
import { toast } from "react-toastify";
function EditTodo() {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos);
  const selectedTodo = todos.filter((todo) => todo.id === id);
  const { todo } = selectedTodo[0];
  const [updatingTodo, setUpdatingTodo] = useState(todo);
  // console.log(updatingTodo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodo({ id: id, updatedTodo: updatingTodo }));
    navigate("/");
    toast.info(`Todo Updated: ${updatingTodo.slice(0, 12)}`, {
      pauseOnFocusLoss: false,
    });
  };

  return (
    <div className="m-auto   mt-10">
      <h1 className="text-3xl text-amber-700 font-semibold">Edit Selected Todo</h1>
      <form onSubmit={handleSubmit} className="mt-5">
        <label
          htmlFor="todo"
          className="text-lg text-zinc-700 pr-2 font-semibold"
        >
          Todo :
        </label>
        <input
          className="rounded text-blue-950 text-center text-2xl focus:outline-yellow-500 p-3 w-3/5 mb-5 mt-5 "
          type="text"
          name="todo"
          value={updatingTodo}
          onChange={(e) => setUpdatingTodo(e.target.value)}
        />
        <br />
        <button className="bg-red-600 p-2 mt-2 rounded-lg font-semibold text-xl">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
