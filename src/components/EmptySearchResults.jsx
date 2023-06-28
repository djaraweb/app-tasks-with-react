import React from 'react';

const EmptySearchResults = ({ searchText }) => {
  return (
    <div>
      No hay resultados para:
      <span className="px-2 text-red-500 font-semibold italic">
        {searchText}
      </span>
    </div>
  );
};

export default EmptySearchResults;
