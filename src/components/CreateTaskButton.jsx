import React from 'react';
import { IoMdAdd } from 'react-icons/io';

function CreateTaskButton(props) {
  return (
    <div className="fixed bottom-16 left-1/2 z-10">
      <button
        className="flex items-center justify-center w-16 h-16 bg-green-300 rounded-full"
        onClick={() => props.setOpenModal(true)}
      >
        <IoMdAdd className="text-3xl" />
      </button>
    </div>
  );
}

export { CreateTaskButton };
