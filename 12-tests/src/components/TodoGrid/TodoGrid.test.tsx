import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TodoGrid from "./TodoGrid";
import { TodosContext } from "../../providers/TodosProvider/TodosProvider";
import { ITodo } from "../../types/ITodo.type";

describe("TodoGrid component", () => {
  test("edit todo", () => {
    const addTodo = vi.fn();
    const removeTodo = vi.fn();
    const editTodo = vi.fn();
    const mockTodos: ITodo[] = [
      {
        name: "Todo 1",
        status: "to-do",
        priority: "high",
        tags: [],
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    render(
      <TodosContext.Provider
        value={{
          todos: mockTodos,
          addTodo: addTodo,
          removeTodo: removeTodo,
          editTodo: editTodo,
        }}
      >
        <TodoGrid />
      </TodosContext.Provider>
    );

    const editButton = screen.getByLabelText("Edit");
    fireEvent.click(editButton);

    const saveButton = screen.getByLabelText("Save");

    const statusSelect = screen.getByText("To Do");
    fireEvent.mouseDown(statusSelect);
    const doneOption = screen.getByText("Done");
    fireEvent.click(doneOption);

    fireEvent.click(saveButton);

    expect(editTodo).toHaveBeenCalledWith("1", {
      status: "done",
      priority: "high",
    });
  });

  test("remove todo", () => {
    const addTodo = vi.fn();
    const removeTodo = vi.fn();
    const editTodo = vi.fn();
    const mockTodos: ITodo[] = [
      {
        name: "Todo 1",
        status: "to-do",
        priority: "high",
        tags: [],
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    render(
      <TodosContext.Provider
        value={{
          todos: mockTodos,
          addTodo: addTodo,
          removeTodo: removeTodo,
          editTodo: editTodo,
        }}
      >
        <TodoGrid />
      </TodosContext.Provider>
    );

    const removeButton = screen.getByLabelText("Delete");
    fireEvent.click(removeButton);

    expect(removeTodo).toHaveBeenCalledWith("1");
  });
});
