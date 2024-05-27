import React from "react";
import { useTodoContext } from "../providers/useTodoContext";

const ToDoElement = ({
  task,
}: {
  task: {
    task: string;
    done: boolean;
    id: number;
  };
}) => {
  const { tasks, setTasks } = useTodoContext();
  return (
    <li
      className={`flex flex-row justify-between gap-x-2 bg-gray-200 p-2 w-full rounded-lg ${
        task.done ? "bg-green-200" : ""
      }`}
      key={task.id}
    >
      <p className={`${task.done ? "line-through" : ""}`}>{task.task}</p>
      <div className="flex flex-row gap-x-4 px-8">
        <input
          type="checkbox"
          className="h-6 w-6 cursor-pointer"
          checked={task.done}
          onChange={(e) => {
            const newTasks = tasks.map((t) => {
              if (t.id == task.id) {
                return { ...t, done: e.target.checked };
              }
              return t;
            });
            setTasks(newTasks);
          }}
        />
        <button
          className=""
          onClick={() => {
            const newTasks = tasks.filter((t) => t.id !== task.id);
            setTasks(newTasks);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default ToDoElement;
