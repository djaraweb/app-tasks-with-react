import { useContext, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { FaList } from 'react-icons/fa';
// Component
import { TaskList } from './components/TaskList';
import { TaskSearch } from './components/TaskSearch';
import { TaskItem } from './components/TaskItem';
import { CreateTaskButton } from './components/CreateTaskButton';
import { TaskCreate } from './components/TaskCreate';
import { Modal } from './Modal';
import { useTasks } from './hooks/useTasks';

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
        {/* Header   */}
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
        {/* Body */}
        <div className="flex-1 w-full p-4">
          <TaskSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setActionFilter={setActionFilter}
          />

          <TaskList
            onActionFilter={setActionFilter}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            onNext={nextTasks}
            onPrevious={previousTasks}
          >
            {error && <p>Hubo un error</p>}
            {loading && <p>Estamos cargando, no desesperes ...</p>}
            {!(!loading && !searchedTasks.lenght) && (
              <p>¡Crea tu primer Task!</p>
            )}

            {searchedTasks.map((item) => (
              <TaskItem
                item={item}
                key={item.id}
                onCompleteTask={() => completeTask(item.id)}
                onDeleteTask={() => deleteTask(item.id)}
                onEditTask={editTask}
              />
            ))}
          </TaskList>

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
