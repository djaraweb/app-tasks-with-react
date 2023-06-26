import { useEffect, useState } from 'react';

function useLocalStorage(itemName, initialValue) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [Tasks, setTasks] = useState(initialValue);

  useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      let parseTasks;
      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parseTasks = initialValue;
      } else {
        parseTasks = JSON.parse(localStorage.getItem(itemName));
      }

      setTasks(parseTasks);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);

  const saveTasks = (newTask) => {
    const stringTasks = JSON.stringify(newTask);
    localStorage.setItem(itemName, stringTasks);
    setTasks(newTask);
  };

  return { Tasks, saveTasks, loading, error };
}

export { useLocalStorage };
