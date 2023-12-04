import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTodo } from "../redux/todoSlice";

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
  };

  return (
    <div className="m-auto border-2 mt-10">
      <h1 className="text-2xl text-gray-400 font-semibold">EditTodo</h1>
      <form onSubmit={handleSubmit} className="mt-5">
        <label htmlFor="todo" className="text-lg"> Todo : </label>
        <input
        className="rounded text-xl text-blue-950 text-center "
          type="text"
          name="todo"
          value={updatingTodo}
          onChange={(e) => setUpdatingTodo(e.target.value)}
        />
  <br />
        <button className="bg-red-600 p-2 mt-2 rounded-lg font-semibold">Update</button>
      </form>
    </div>
  );
}

export default EditTodo;
