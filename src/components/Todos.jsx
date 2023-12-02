import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../redux/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  console.log(todos);
  return (
    <div>
      {todos.length === 0 ? (
        <div>Start adding Your Todos...</div>
      ) : (
        <div className="m-auto ">
          {todos.map((elem, i) => (
            <div key={elem.id} className="flex justify-around ">
              <p>{i + 1}</p>
              <p>{elem.todo}</p>
              <button>Edit</button>
              <button onClick={() => dispatch(removeTodo(elem.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
