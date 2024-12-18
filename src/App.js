import "./App.css";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import Todos from "./components/Todos";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodo />
                <Todos />
              </>
            }
          />

          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
