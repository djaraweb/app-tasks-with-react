import axios from 'axios';
const connectionAxios = (API = 'https://dummyjson.com/') => {
  const apiConnection = axios.create({
    baseURL: API,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return {
    apiConnection,
  };
};

export default connectionAxios;
