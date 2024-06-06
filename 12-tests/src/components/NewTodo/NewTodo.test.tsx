import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import NewTodo from "./NewTodo";
import { TodosContext } from "../../providers/TodosProvider/TodosProvider";

describe("NewTodo component", () => {
  test("new todo", () => {
    const addTodo = vi.fn();
    render(
      <TodosContext.Provider
        value={{
          todos: [],
          addTodo: addTodo,
          removeTodo: () => {},
          editTodo: () => {},
        }}
      >
        <NewTodo />
      </TodosContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Todo Name"), {
      target: { value: "New Todo" },
    });

    const prioritySelect = screen.getByLabelText("Priority");
    fireEvent.mouseDown(prioritySelect);
    const highPriorityOption = screen.getByText("High");
    fireEvent.click(highPriorityOption);

    fireEvent.click(screen.getByText("Add"));

    expect(addTodo).toHaveBeenCalledTimes(1);

    expect(addTodo).toHaveBeenCalledWith({
      name: "New Todo",
      priority: "high",
      tags: [],
    });
  });
});
