import { useContext, useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import { FaList } from 'react-icons/fa';
// Component
import Error from './components/Error';
import Loading from './components/Loading';
import EmptyTasks from './components/EmptyTasks';
import EmptySearchResults from './components/EmptySearchResults';

import { TaskList } from './components/TaskList';
import { TaskSearch } from './components/TaskSearch';
import { TaskItem } from './components/TaskItem';
import { CreateTaskButton } from './components/CreateTaskButton';
import { TaskCreate } from './components/TaskCreate';
import { Modal } from './Modal';
import { useTasks } from './hooks/useTasks';
import TaskHeader from './components/TaskHeader';

function App() {
  const {
    error,
    loading,
    searchedTasks,
    completeTask,
    deleteTask,
    editTask,
    openModal,
    setOpenModal,
    setActionFilter,
    searchValue,
    setSearchValue,
    addTask,
    completedTasks,
    totalTasks,
    nextTasks,
    previousTasks,
  } = useTasks();

  return (
    <div className="p-6 h-screen ">
      <div className="flex flex-col w-full h-full  border rounded-xl overflow-hidden">
        <TaskHeader loading={loading}>
          {/* Pasar la propiedad loading a cada uno de sus componentes hijos (children) */}
          <TaskSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setActionFilter={setActionFilter}
            //loading={loading}
          />
        </TaskHeader>
        {/* Body */}
        <div className="flex-1 w-full p-4">
          <TaskList
            error={error}
            loading={loading}
            searchedTasks={searchedTasks}
            searchText={searchValue}
            onActionFilter={setActionFilter}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            onNext={nextTasks}
            onPrevious={previousTasks}
            onError={() => <Error />}
            onLoading={() => <Loading />}
            onEmptyTasks={() => <EmptyTasks />}
            onEmptySearchResults={(search) => (
              <EmptySearchResults searchText={search} />
            )}
            render={(item) => (
              <TaskItem
                item={item}
                key={item.id}
                onCompleteTask={() => completeTask(item.id)}
                onDeleteTask={() => deleteTask(item.id)}
                onEditTask={editTask}
              />
            )}
          ></TaskList>

          {!!openModal && (
            <Modal>
              <TaskCreate setOpenModal={setOpenModal} addTask={addTask} />
            </Modal>
          )}

          <CreateTaskButton openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        {/* Footer */}
        <div className="px-4 py-2 flex items-center justify-between">
          <a href="https://github.com/djaraweb" target="_blank">
            djara@dev
          </a>
          <span>v1.0</span>
        </div>
      </div>
    </div>
  );
}

export default App;
