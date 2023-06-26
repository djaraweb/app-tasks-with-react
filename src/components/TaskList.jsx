import React from 'react';
import { TaskCounter } from './TaskCounter';

function TaskList({ children, onActionFilter }) {
  return (
    <section className="py-2">
      <ul className="">{children}</ul>
      <div className="flex items-center justify-end border-t-2 border-b-2 px-2 py-4 mt-4 mb-4">
        <TaskCounter />
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
