import { useContext } from "react";
import { TodoContext } from "./TodoProvider";

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
