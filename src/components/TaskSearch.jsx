import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function TaskSearch({ searchValue, setSearchValue, setActionFilter, loading }) {
  const onChangeSearchValue = (e) => {
    setActionFilter('search');
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 relative">
      <span className="absolute inset-y-0 flex items-center pl-3">
        <FaSearch className=" text-gray-400" />
      </span>
      <input
        type="text"
        className="block flex-1 h-12 border-0 bg-transparent py-1.5 pl-9  text-gray-800 placeholder:text-gray-400 focus:ring-0 disabled:opacity-25  "
        placeholder="Enter a task to filter"
        onChange={onChangeSearchValue}
        value={searchValue}
        disabled={loading}
      />
    </div>
  );
}

export { TaskSearch };
