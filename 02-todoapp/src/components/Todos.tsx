import React, { useState } from "react";
import ToDoElement from "./ToDoElement";
import { useTodoContext } from "../providers/useTodoContext";

const Todos = () => {
  const { tasks, search, filter, sort, page, setPage, setTasks } =
    useTodoContext();

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [num, setNum] = useState(5);

  const handleItemsPerPage = (e: any) => {
    e.preventDefault();
    setPage(1);
    setItemsPerPage(num);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (search === "" ||
        task.task.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "all" ||
        (filter === "done" && task.done) ||
        (filter === "undone" && !task.done))
    );
  });

  if (
    filteredTasks.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .length === 0 &&
    page > 1
  ) {
    setPage(page - 1);
  }

  if (sort == "ascending") {
    filteredTasks.sort((a, b) => a.task.localeCompare(b.task));
  } else if (sort == "descending") {
    filteredTasks.sort((a, b) => b.task.localeCompare(a.task));
  }

  if (tasks.length === 0) {
    return <p className="font-light text-lg text-gray-500">No tasks found.</p>;
  }
  return (
    <>
      <p>Page: {page}</p>
      <ul className=" px-4 flex flex-col gap-y-4">
        {filteredTasks
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((task) => (
            <ToDoElement key={task.id} task={task} />
          ))}
      </ul>
      <div className="w-full px-4 pt-2 flex justify-around">
        <div className="flex gap-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * itemsPerPage >= filteredTasks.length}
            className="px-4 py-2 bg-gray-200 text-gray-800"
          >
            Next
          </button>
        </div>
        <div className="flex gap-x-4">
          <form onSubmit={handleItemsPerPage}>
            <label htmlFor="itemsPerPage" className="pr-2">
              Items per page:{" "}
            </label>
            <input
              id="itemsPerPage"
              type="number"
              value={num}
              onChange={(e) => setNum(parseInt(e.target.value))}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Todos;
