import React from 'react';
import { TaskCounter } from './TaskCounter';

function TaskList({
  children,
  onActionFilter,
  totalTasks,
  completedTasks,
  onNext,
  onPrevious,
}) {
  return (
    <section className="py-2">
      <ul className="">{children}</ul>
      <div className="flex items-center justify-between  border-t-2 border-b-2 px-2 py-4 mt-4 mb-4">
        <TaskCounter totalTasks={totalTasks} completedTasks={completedTasks} />
        <div className="inline-flex gap-1">
          <button className="btn-default" onClick={() => onPrevious()}>
            Prev
          </button>
          <button className="btn-default" onClick={() => onNext()}>
            Next
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button className="btn-default" onClick={() => onActionFilter('All')}>
            All
          </button>
          <button
            className="btn-default"
            onClick={() => onActionFilter('Active')}
          >
            Active
          </button>
          <button
            className="btn-default"
            onClick={() => onActionFilter('Completed')}
          >
            Completed
          </button>
        </div>
        <button className="btn-default">Clear Completed</button>
      </div>
    </section>
  );
}

export { TaskList };
