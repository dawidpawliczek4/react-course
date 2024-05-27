import { createContext, useState } from "react";

const todos = [
  { task: "Do homework", done: false, id: 1 },
  { task: "Go shopping", done: true, id: 2 },
  { task: "Clean the house", done: false, id: 3 },
  { task: "Walk the dog", done: true, id: 4 },
  { task: "Cook dinner", done: false, id: 5 },
  { task: "Do laundry", done: true, id: 6 },
  { task: "Read a book", done: false, id: 7 },
  { task: "Go to the gym", done: true, id: 8 },
  { task: "Write a blog post", done: false, id: 9 },
  { task: "Call mom", done: true, id: 10 },
  { task: "Go to the bank", done: false, id: 11 },
];

export const TodoContext = createContext<{
  tasks: {
    task: string;
    done: boolean;
    id: number;
  }[];
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        task: string;
        done: boolean;
        id: number;
      }[]
    >
  >;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}>({
  tasks: [],
  setTasks: () => {},
  search: "",
  setSearch: () => {},
  filter: "all",
  setFilter: () => {},
  sort: "default",
  setSort: () => {},
  page: 1,
  setPage: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<
    {
      task: string;
      done: boolean;
      id: number;
    }[]
  >(todos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  return (
    <TodoContext.Provider
      value={{
        tasks,
        setTasks,
        search,
        setSearch,
        filter,
        setFilter,
        sort,
        setSort,
        page,
        setPage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
