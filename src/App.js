import "./App.css";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import Todos from "./components/Todos";
import { BrowserRouter,Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
