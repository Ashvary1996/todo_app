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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodo({ id: id, updatedTodo: updatingTodo }));
    navigate("/");
  };

  return (
    <div>
      <h1>EditTodo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo"> Todo : </label>
        <input
          type="text"
          name="todo"
          value={updatingTodo}
          onChange={(e) => setUpdatingTodo(e.target.value)}
        />

        <button>Update</button>
      </form>
    </div>
  );
}

export default EditTodo;
