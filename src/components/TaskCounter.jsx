import React, { useContext } from 'react';

function TaskCounter({ totalTasks, completedTasks }) {
  return (
    <h2 className="text-gray-700 text-lg">
      You have completed {completedTasks} of {totalTasks} Tasks
    </h2>
  );
}

export { TaskCounter };
