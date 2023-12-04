import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkingcheckBox, removeTodo } from "../redux/todoSlice";
import { Link } from "react-router-dom";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  console.log(todos);
  return (
    <div>
      {todos.length === 0 ? (
        <div>Start adding Your Todos...</div>
      ) : (
        <div className="m-auto mt-8 w-[70%]  relative">
          {todos.map((elem, i) => (
            <div
              key={elem.id}
              className="text-2xl flex  w-[100%] border-1 gap-2 p-5 mb-5 rounded-lg bg-gray-800 pb-8"
            >
              <p className="w-10 ">{i + 1} .</p>

              <input
                type="checkbox"
                name="packersOff"
                className="strikethrough mr-4 h-6 mt-1 w-6 hover:cursor-pointer text-red-700"
                id="checkbox"
                checked={elem.completed}
                onChange={() => dispatch(checkingcheckBox(elem.id))}
              />

              <p className="w-[55%]   ">{elem.todo}</p>

              <div className=" todoBtns absolute right-[5%] m-auto">
                <Link
                  className=" edit   bg-yellow-500 p-2 rounded-s-full   hover:text-gray-700"
                  to={`/edit/${elem.id}`}
                >
                  Edit
                </Link>

                <button
                  className="  remove bg-red-500 p-2 rounded-e-full  hover:text-gray-700"
                  onClick={() => dispatch(removeTodo(elem.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
