import { useState, useEffect, createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
export const TaskContext = createContext();

const TaskProvider = (props) => {
  // Nos traemos Task el estado y las funciones de nuestra aplicación que queremos globales
  const { Tasks, saveTasks, loading, error } = useLocalStorage('TaskS_v1', []);

  //const [listTasks, setListTasks] = useState(Tasks);
  const [actionFilter, setActionFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const completedTasks = Tasks.filter((Task) => !!Task.completed).length;
  const totalTasks = Tasks.length;

  let searchedTasks = [];
  switch (actionFilter) {
    case 'search':
      if (!searchValue.length >= 1) {
        searchedTasks = Tasks;
      } else {
        searchedTasks = Tasks.filter((Task) => {
          const TaskText = Task.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
          return TaskText.includes(searchText);
        });
      }
      break;
    case 'Completed':
      searchedTasks = Tasks.filter((Task) => !!Task.completed);
      break;
    case 'Active':
      searchedTasks = Tasks.filter((Task) => !Task.completed);
      break;
    default: // All
      searchedTasks = Tasks;
  }

  const addTask = (text) => {
    const newTasks = [...Tasks];
    newTasks.push({
      completed: false,
      text,
    });
    saveTasks(newTasks);
  };

  const completeTask = (text) => {
    const TaskIndex = Tasks.findIndex((Task) => Task.text === text);
    const newTasks = [...Tasks];
    newTasks[TaskIndex].completed = !newTasks[TaskIndex].completed;
    saveTasks(newTasks);
  };

  const editTask = (text, newText) => {
    console.log(text, newText);
    const TaskIndex = Tasks.findIndex((Task) => Task.text === text);
    const newTasks = [...Tasks];
    newTasks[TaskIndex].text = newText;
    saveTasks(newTasks);
  };

  const deleteTask = (text) => {
    const TaskIndex = Tasks.findIndex((Task) => Task.text === text);
    const newTasks = [...Tasks];
    newTasks.splice(TaskIndex, 1);
    saveTasks(newTasks);
  };
  // Retornamos nuestro proveedor con nuestro contexto en la etiqueta value, que recibirá a toda nuestra aplicación, por eso necesitamos la prop children

  return (
    <TaskContext.Provider
      value={{
        loading,
        error,
        totalTasks,
        searchValue,
        addTask,
        completedTasks,
        Tasks,
        setActionFilter,
        setSearchValue,
        searchedTasks,
        completeTask,
        deleteTask,
        editTask,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

// Exportamos nuestro proveedor  para acceder a nuestro contexto
export { TaskProvider };
