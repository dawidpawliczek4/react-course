import React from "react";
import { useTodoContext } from "../providers/useTodoContext";

const FilterForm = () => {
  const { search, filter, setFilter, setSort, setSearch } = useTodoContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex justify-around w-full">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        className="p-2 w-1/2 rounded-lg"
      />

      <select onChange={handleSort} className="p-2 rounded-lg cursor-pointer">
        <option value="default">Default</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>

      <select
        value={filter}
        onChange={handleFilter}
        className="p-2 rounded-lg cursor-pointer"
      >
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </select>
    </div>
  );
};

export default FilterForm;
