import React from "react";
import TodoForm from "./components/TodoForm";
import FilterForm from "./components/FilterForm";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-4 flex items-center flex-col gap-y-8 py-6 my-8">
      <p className="text-4xl">To Do App</p>
      <TodoForm />
      <FilterForm />
      <Todos />
    </div>
  );
}

export default App;
