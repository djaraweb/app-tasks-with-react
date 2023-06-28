import connectionAxios from '../apiConnection';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const useTasks = (props) => {
  // Nos traemos Task el estado y las funciones de nuestra aplicación que queremos globales
  //const { Tasks, saveTasks, loading, error } = useLocalStorage('TaskS_v1', []);
  let itemLocalStorage = 'Tasksv1';
  const { apiConnection } = connectionAxios();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [Tasks, setTasks] = useState([]);
  const [skip, setSkip] = useState(1);
  const [actionFilter, setActionFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const completedTasks = Tasks.filter((Task) => !!Task.completed).length;
  const totalTasks = Tasks.length;

  useEffect(() => {
    getTasks();
  }, []);

  let searchedTasks = [];
  switch (actionFilter) {
    case 'search':
      if (!searchValue.length >= 1) {
        searchedTasks = Tasks;
      } else {
        searchedTasks = Tasks.filter((Task) => {
          const TaskText = Task.todo.toLowerCase();
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

  const getTasks = async (limit = 5) => {
    try {
      setLoading(true);
      await apiConnection
        .get(`/todos?limit=${limit}&skip=${skip}`)
        .then((response) => {
          const { todos } = response.data;
          localStorage.setItem(itemLocalStorage, JSON.stringify(todos));
          setTasks(todos);
        })
        .catch((error) => {
          setError(error);
        });
    } catch (ex) {
      console.error('Error no controlado: ', ex);
    } finally {
      setLoading(false);
    }
  };

  const nextTasks = () => {
    setSkip(skip + 1);
    getTasks();
  };
  const previousTasks = () => {
    let prev = skip - 1;
    if (prev <= 0) {
      setSkip(0);
    } else {
      setSkip(prev);
    }
    getTasks();
  };

  const saveTasksInLocalStorage = (newTask) => {
    const stringTasks = JSON.stringify(newTask);
    localStorage.setItem(itemLocalStorage, stringTasks);
    setTasks(newTask);
  };

  const addTask = (todo) => {
    const newTasks = [...Tasks];
    newTasks.push({
      id: Math.floor(Math.random() * 999),
      completed: false,
      todo,
      userId: 5,
    });
    saveTasksInLocalStorage(newTasks);
  };

  const completeTask = (id) => {
    const TaskIndex = Tasks.findIndex((Task) => Task.id === id);
    const newTasks = [...Tasks];
    newTasks[TaskIndex].completed = !newTasks[TaskIndex].completed;
    saveTasksInLocalStorage(newTasks);
  };

  const editTask = (id, newText) => {
    const TaskIndex = Tasks.findIndex((Task) => Task.id === id);
    const newTasks = [...Tasks];
    newTasks[TaskIndex].todo = newText;
    saveTasksInLocalStorage(newTasks);
  };

  const deleteTask = (id) => {
    const TaskIndex = Tasks.findIndex((Task) => Task.id === id);
    const newTasks = [...Tasks];
    newTasks.splice(TaskIndex, 1);
    saveTasksInLocalStorage(newTasks);
  };
  // Retornamos nuestro proveedor con nuestro contexto en la etiqueta value, que recibirá a toda nuestra aplicación, por eso necesitamos la prop children

  return {
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
    nextTasks,
    previousTasks,
  };
};

export { useTasks };
