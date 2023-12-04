import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../redux/todoSlice";
import { Link } from "react-router-dom";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  // const checkBox = false;
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

              <label>
                <input
                  type="checkbox"
                  name="packersOff"
                  className="strikethrough"
                  id="checkbox"
                  // checked={JSON.parse(localStorage.getItem("myTodosCheck"))}
                  value="0"
                  // onClick={() => {
                  //   var checkbox = document.getElementById("checkbox");
                  //   localStorage.setItem("myTodosCheck",checkbox.checked);
                  // }}
                />
                <span>{elem.todo}</span>
              </label>

              <Link to={`/edit/${elem.id}`}> Edit </Link>
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
