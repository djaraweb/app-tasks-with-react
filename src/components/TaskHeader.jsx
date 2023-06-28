import React, { Children, cloneElement } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { FaList } from 'react-icons/fa';

const TaskHeader = ({ children, loading }) => {
  return (
    <>
      <div className="bg-gray-100 w-full p-3 flex items-center justify-between">
        <p className="flex items-center gap-1 font-semibold  ">
          <FaList />
          <span>Admin Tasks</span>
        </p>
        <div className="flex items-center justify-center">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="w-7 h-7 " alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="w-7 h-7 " alt="React logo" />
          </a>
        </div>
      </div>
      <div className="px-4 mt-4">
        {Children.toArray(children).map((child) =>
          cloneElement(child, { loading })
        )}
      </div>
    </>
  );
};

export default TaskHeader;
