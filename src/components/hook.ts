import { useState, useEffect } from 'react';
import { getData, putData, postData, deleteData } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getData();
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCheckboxChange = async (id: number, completed: boolean) => {
    try {
      const response = await putData(id, { completed });
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: response.data.completed } : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleTitleChange = async (id: number, title: string) => {
    try {
      const response = await putData(id, { title });
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: response.data.title } : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteData(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await postData({
        title: newTodoTitle,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodoTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return { handleDelete, handleAddTodo, setNewTodoTitle, todos, newTodoTitle, handleCheckboxChange, handleTitleChange };
};

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
