import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkingcheckBox, removeTodo } from "../redux/todoSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // console.log(todos);
  return (
    <div>
      {todos.length === 0 ? (
        <div className="text-4xl text-gray-500 font-semibold">
          Start adding Your Todos...
        </div>
      ) : (
        <div className=" m-auto mt-8 w-3/4  relative">
          {todos.map((elem, i) => (
            <div
              key={elem.id}
              className="todoSDiv text-2xl flex  w-[100%] border-1 gap-2 p-5 mb-5 rounded-lg  pb-8  "
            >
              <p className="w-10 ">{i + 1}</p>

              <input
                type="checkbox"
                name="packersOff"
                className="strikethrough mr-4 h-6 mt-1 w-6 hover:cursor-pointer text-red-700"
                id="checkbox"
                checked={elem.completed}
                onChange={() => dispatch(checkingcheckBox(elem.id))}
              />

              <p className="w-[65%] lg:[10%] text-amber-200  ">{elem.todo}</p>

              <div className=" todoBtns absolute right-[5%] m-auto">
                <Link
                  onClick={(event) => {
                    if (elem.completed === true) event.preventDefault();
                  }}
                  className={` edit   bg-yellow-500 p-2 rounded-s-full   ${
                    elem.completed === true
                      ? " hover:text-gray-400  hover:cursor-not-allowed"
                      : "hover:text-gray-700"
                  }`}
                  to={`/edit/${elem.id}`}
                >
                  Edit
                </Link>

                <button
                  className="  remove bg-red-500 p-2 rounded-e-full  hover:text-gray-700"
                  onClick={() => {
                    dispatch(removeTodo(elem.id));
                    toast.warn(`todo Removed: ${elem.todo}`, {
                      pauseOnFocusLoss: false,
                    });
                  }}
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
