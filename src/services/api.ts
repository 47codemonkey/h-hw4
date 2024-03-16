import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://65ef5bb3ead08fa78a5055fb.mockapi.io/todos';

export const getData = (): Promise<AxiosResponse<Todo[]>> => {
  return axios.get(API_URL);
};

export const putData = (id: number, data: Partial<Todo>): Promise<AxiosResponse<Todo>> => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const postData = (data: Omit<Todo, 'id'>): Promise<AxiosResponse<Todo>> => {
  return axios.post(API_URL, data);
};

export const deleteData = (id: number): Promise<void> => {
  return axios.delete(`${API_URL}/${id}`);
};

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
