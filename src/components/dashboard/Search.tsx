import React from 'react';
import { SearchLineIcon } from '../common/Icons';

const Search = () => {
  return (
    <div className="w-full flex items-center gap-2 bg-white drop-shadow rounded px-6 py-2">
      <SearchLineIcon />
      <input
        type="text"
        placeholder="Search by coin"
        className=" w-full focus:outline-none placeholder:font-semibold placeholder:text-gray-1"
      />
    </div>
  );
};

export default Search;
