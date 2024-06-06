import { describe, test, expect } from "vitest";
import { todosReducer } from "./todosReducer";
import { IBaseTodoFields, ITags, ITodo } from "../../types/ITodo.type";

describe("todosReducer", () => {
  test("add a todo", () => {
    const state: ITodo[] = [];
    const newTodo: Omit<IBaseTodoFields, "status"> = {
      name: "Learn Vitest",
      priority: "low",
      tags: ["sales"],
    };
    const action = { type: "ADD_TODO", payload: newTodo };
    const newState = todosReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState[0]).toMatchObject({
      name: "Learn Vitest",
      status: "to-do",
      priority: "low",
      tags: ["sales"],
    });
    expect(newState[0].id).toBeDefined();
    expect(newState[0].createdAt).toBeInstanceOf(Date);
    expect(newState[0].updatedAt).toBeInstanceOf(Date);
  });

  test("remove a todo", () => {
    const state: ITodo[] = [
      {
        id: "1",
        name: "Learn Vitest",
        status: "to-do",
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["sales"],
      },
    ];
    const action = { type: "REMOVE_TODO", payload: "1" };
    const newState = todosReducer(state, action);

    expect(newState).toHaveLength(0);
  });

  test("update the name of todo", () => {
    const state: ITodo[] = [
      {
        id: "1",
        name: "Learn Vitest",
        status: "to-do",
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["sales"],
      },
    ];
    const action = {
      type: "SET_NAME",
      payload: { id: "1", name: "Learn Jest" },
    };

    const newState = todosReducer(state, action);

    expect(newState[0].name).toBe("Learn Jest");
  });

  test("update the status of todo", () => {
    const state: ITodo[] = [
      {
        id: "1",
        name: "Learn Vitest",
        status: "to-do",
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["sales"],
      },
    ];
    const action = {
      type: "SET_STATUS",
      payload: { id: "1", status: "in-progress" },
    };

    const newState = todosReducer(state, action);

    expect(newState[0].status).toBe("in-progress");
  });

  test("update the priority of todo", () => {
    const state: ITodo[] = [
      {
        id: "1",
        name: "Learn Vitest",
        status: "to-do",
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["sales"],
      },
    ];
    const action = {
      type: "SET_PRIORITY",
      payload: { id: "1", priority: "high" },
    };

    const newState = todosReducer(state, action);

    expect(newState[0].priority).toBe("high");
  });

  test("update the tags of todo", () => {
    const state: ITodo[] = [
      {
        id: "1",
        name: "Learn Vitest",
        status: "to-do",
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["sales"],
      },
    ];
    const action = {
      type: "SET_TAGS",
      payload: { id: "1", tags: ["marketing", "sales"] },
    };

    const newState = todosReducer(state, action);

    expect(newState[0].tags).toEqual(["marketing", "sales"]);
  });

  test("return the state if action type is unknown", () => {
    const state: ITodo[] = [
      {
        id: "1",
        name: "Learn Vitest",
        status: "to-do",
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["sales"],
      },
    ];
    const action = { type: "UNKNOWN", payload: "1" };

    const newState = todosReducer(state, action);

    expect(newState).toEqual(state);
  });
});
