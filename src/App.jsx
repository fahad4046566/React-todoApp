import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

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

  const toggleFinished = () => {
    setshowfinished(!showfinished);
  };
  

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
    saveToLS(newTodos);
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
      <div className="container my-5 p-5 bg-white dark:bg-gray-900 min-h-screen rounded-xl mx-auto border border-violet-200 dark:border-gray-700 shadow-sm max-w-2xl">
        <div className="addTodo mb-8">
          <h2 className="text-xl font-semibold text-violet-800 dark:text-violet-300 mb-3">
            Add a Todo
          </h2>
          <div className="flex gap-2 mb-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="bg-white dark:bg-gray-800 border border-violet-300 dark:border-gray-600 rounded-lg px-4 py-3 grow focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter your todo..."
            />
            <button
              disabled={todo.length < 3}
              onClick={handleAdd}
              className={`btn h-12 px-6 ${todo.length < 3 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              Save
            </button>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                onChange={toggleFinished} 
                type="checkbox" 
                checked={showfinished}
                className="h-5 w-5 text-violet-600 dark:text-violet-400 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Show Finished</span>
            </label>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-violet-900 dark:text-violet-200 mb-6">Your Todos</h1>

        <div className="todos">
          {todos.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No todos to display
            </div>
          )}
          
          {todos.map((item, index) => (
            (showfinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 my-3 rounded-xl shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    className="h-5 w-5 text-violet-600 dark:text-violet-400 rounded"
                  />
                  <div
                    className={
                      item.isCompleted
                        ? "line-through text-gray-500 dark:text-gray-400 text-lg"
                        : "text-gray-800 dark:text-gray-200 text-lg"
                    }
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-2">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
