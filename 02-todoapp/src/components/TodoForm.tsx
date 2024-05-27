import React, { useState } from "react";
import { useTodoContext } from "../providers/useTodoContext";

const TodoForm = () => {
  const { tasks, setTasks } = useTodoContext();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") return;
    const maxId = Math.max(...tasks.map((task) => task.id));
    const newTask = { task: value, done: false, id: maxId + 1 };
    setTasks([...tasks, newTask]);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-x-2 w-full">
      <input
        type="text"
        placeholder="Add Task Here..."
        className="border-black-300 border-2 rounded-md flex-grow p-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 border-[1px] border-black rounded-lg"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;