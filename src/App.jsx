import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (todoToSave = todos) => {
    localStorage.setItem("todos", JSON.stringify(todoToSave));
  };

  const toggleFinished=() => {
    setshowfinished(!showfinished)
  }
  

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);

    setTodo("");
    saveToLS(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <div className="container my-5 p-5 bg-violet-50 min-h-screen rounded-xl mx-auto border border-violet-200 shadow-sm max-w-2xl">
        <div className="addTodo mb-8">
          <h2 className="text-xl font-semibold text-violet-800 mb-3">
            Add a Todo
          </h2>
          <div className="flex gap-2">
            {/* Input field – value state se control, change pe handler call */}
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="bg-white border border-violet-300 rounded-lg px-4 py-3 grow focus:outline-none focus:ring-2 focus:ring-violet-4..."
            />
            {/* Add button – click pe handleAdd call hoga */}
            <button
            disabled={todo.length<3}
              onClick={handleAdd}
              className="btn btn-outline btn-success h-12"
            >
              Save
            </button>
          </div>
          <input onChange={toggleFinished} type="checkbox" checked={showfinished } /> Show Finished
        </div>

        <h1 className="text-xl font-bold">Your Todos</h1>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {/* Todos array ko map kar ke har todo ke liye card bana rahe hain */}
          {todos.map((item, index) => ((showfinished || !item.isCompleted) && <div
              key={index}
              className="flex items-center justify-between bg-white p-4 my-2 rounded-lg shadow"
            >
              <div className="flex gap-5 ">
                <input
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isComplited}
                  name={item.id}
                  id=""
                />
                {/* Todo text – agar completed ho to line-through lagegi */}
                <div
                  className={
                    item.isCompleted
                      ? "line-through text-gray-500"
                      : "text-gray-700"
                  }
                >
                  {item.todo}
                </div>
              </div>
              {/* Buttons – edit aur delete ke liye */}
              <div className="buttons flex gap-2">
                <button
                  onClick={(e) => handleEdit(e, item.id)} // index pass kar rahe hain edit ke liye
                  className="btn bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)} // index pass kar ke delete karenge
                  className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
