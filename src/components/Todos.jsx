import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkingcheckBox, removeTodo, reorderTodos } from "../redux/todoSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [movedTodo] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, movedTodo);

    dispatch(reorderTodos(reorderedTodos));
  };

  return (
    <div className="container mx-auto p-4">
      {todos.length === 0 ? (
        <div className="text-lg sm:text-2xl md:text-4xl text-gray-500 font-semibold text-center mt-10">
          Start adding Your Todos...
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="m-auto mt-8 w-full sm:w-11/12 md:w-3/4"
              >
                {todos.map((elem, i) => (
                  <Draggable key={elem.id} draggableId={elem.id} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="todoSDiv text-white flex items-center w-full border border-gray-600 gap-3 p-3 sm:p-4 mb-4 rounded-md shadow-md"
                      >
                        <p className="text-sm sm:text-lg w-6 text-center">
                          {i + 1}
                        </p>
                        <input
                          type="checkbox"
                          className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer strikethrough  "
                          checked={elem.completed}
                          onChange={() => dispatch(checkingcheckBox(elem.id))}
                        />
                        <p className="flex-1 text-sm sm:text-base md:text-lg  text-amber-200">
                          {elem.todo}
                        </p>
                        <div className="flex gap-2">
                          <Link
                            onClick={(event) => {
                              if (elem.completed) event.preventDefault();
                            }}
                            className={`px-2 py-1 text-xs font-mono font-semibold sm:text-sm md:text-base rounded-md transition ${
                              elem.completed
                                ? "cursor-not-allowed bg-gray-400 line-through hover:bg-gray-400 "
                                : " bg-yellow-500 hover:bg-yellow-600 "
                            }`}
                            to={`/edit/${elem.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="px-2 py-1 text-xs sm:text-sm md:text-base rounded-md bg-red-500 hover:bg-red-600 transition"
                            onClick={() => {
                              dispatch(removeTodo(elem.id));
                              toast.warn(`Todo Removed: ${elem.todo}`, {
                                pauseOnFocusLoss: false,
                                position: "top-center",
                                autoClose: 2000,
                              });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default Todos;
