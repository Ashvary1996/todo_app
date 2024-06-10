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
    <div>
      {todos.length === 0 ? (
        <div className="text-4xl text-gray-500 font-semibold text-center mt-10">
          Start adding Your Todos...
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="m-auto mt-8 w-full md:w-3/4 relative"
              >
                {todos.map((elem, i) => (
                  <Draggable key={elem.id} draggableId={elem.id} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="todoSDiv text-2xl flex flex-col md:flex-row items-center w-full border gap-2 p-5 mb-5 rounded-lg pb-8"
                      >
                        <p className="w-10">{i + 1}</p>
                        <input
                          type="checkbox"
                          className="strikethrough mr-4 h-6 w-6 hover:cursor-pointer"
                          checked={elem.completed}
                          onChange={() => dispatch(checkingcheckBox(elem.id))}
                        />
                        <p className="flex-1 text-amber-200">{elem.todo}</p>
                        <div className="todoBtns flex space-x-2 md:space-x-4 mt-4 md:mt-0">
                          <Link
                            onClick={(event) => {
                              if (elem.completed) event.preventDefault();
                            }}
                            className={`edit bg-yellow-500 p-2 rounded-lg transition duration-300 ${
                              elem.completed
                                ? "hover:text-gray-400 hover:cursor-not-allowed"
                                : "hover:text-gray-700"
                            }`}
                            to={`/edit/${elem.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="remove bg-red-500 p-2 rounded-lg transition duration-300 hover:text-gray-700"
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
