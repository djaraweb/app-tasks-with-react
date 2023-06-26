import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskProvider';

function TaskCounter() {
  const { totalTasks, completedTasks } = useContext(TaskContext);
  return (
    <h2 className="text-gray-700 text-lg">
      You have completed {completedTasks} of {totalTasks} Tasks
    </h2>
  );
}

export { TaskCounter };
