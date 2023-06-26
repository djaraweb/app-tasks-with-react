import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from 'react-icons/ri';

function TaskItem({ item, onCompleteTask, onDeleteTask, onEditTask }) {
  const { text, completed } = item;
  const [editTask, setEditTask] = useState(false);
  const [inputTask, setInputTask] = useState(text);

  const handleSaveEditTask = () => {
    //console.log(inputTask, item);
    onEditTask(text, inputTask);
    setEditTask(false);
  };
  const handleCancelEditTask = () => {
    setEditTask(false);
    setInputTask(text);
  };

  const handledOnChangeTask = (e) => {
    setInputTask(e.target.value);
  };

  return (
    <li className="p-4 mb-2 flex justify-between border shadow-md rounded-md">
      <div className="flex-1 flex items-center gap-3 bg-red-100x">
        <span
          className="text-gray-500 text-2xl cursor-pointer hover:text-gray-800"
          onClick={onCompleteTask}
        >
          {completed ? (
            <RiCheckboxCircleLine className="text-lime-500" />
          ) : (
            <RiCheckboxBlankCircleLine />
          )}
        </span>
        {!editTask ? (
          <span className={completed ? 'line-through' : ''}>{text}</span>
        ) : (
          <input
            className="w-full border-gray-100 border-b-2 bg-transparent py-1 pl-2x text-gray-500 focus:outline-none"
            value={inputTask}
            onChange={(e) => handledOnChangeTask(e)}
          />
        )}
      </div>

      <div className="flex gap-2 items-center justify-center w-20 ">
        {editTask ? (
          <>
            <button
              onClick={() => handleSaveEditTask()}
              className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center focus:ring-2 focus:ring-blue-300 hover:ring-2 hover:bg-gray-300 hover:ring-blue-300"
            >
              <FaSave size={14} />
            </button>
            <button
              onClick={() => handleCancelEditTask()}
              className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center focus:ring-2 focus:ring-blue-300 hover:ring-2 hover:bg-gray-300 hover:ring-blue-300"
            >
              <GiCancel size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onDeleteTask}
              className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center focus:ring-2 focus:ring-blue-300 hover:ring-2 hover:bg-gray-300 hover:ring-blue-300"
            >
              <FaTrash size={12} />
            </button>
            {!completed && (
              <button
                onClick={() => setEditTask(true)}
                className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center focus:ring-2 focus:ring-blue-300 hover:ring-2 hover:bg-gray-300 hover:ring-blue-300"
              >
                <FaEdit size={14} />
              </button>
            )}
          </>
        )}
      </div>
    </li>
  );
}

export { TaskItem };
