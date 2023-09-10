import {instance} from '../config';

const fetchData = async (endpoint: string) => {
  const result = await instance.get(endpoint);
  return result?.data;
};

const deleteData = async (endpoint: string) => {
  const result = await instance.delete(endpoint);
  return result?.data;
};

const setData = async (endpoint: string, body: object) => {
  const result = await instance.post(endpoint, body);
  return result?.data;
};

const updateData = async (endpoint: string, body: object) => {
  const result = await instance.put(endpoint, body);
  return result?.data;
};

export {updateData, fetchData, deleteData, setData};
