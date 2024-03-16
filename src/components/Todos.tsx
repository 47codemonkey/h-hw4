import { ChangeEvent } from 'react';

import { useTodos } from './hook';

export const Todos = () => {
  const { handleDelete, handleAddTodo, setNewTodoTitle, todos, newTodoTitle, handleCheckboxChange, handleTitleChange } =
    useTodos();

  return (
    <div>
      <input
        style={{ marginRight: '20px' }}
        type="text"
        value={newTodoTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodoTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul style={{ listStyleType: 'none' }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '20px' }}>
            <input
              style={{ marginRight: '50px' }}
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo.id, !todo.completed)}
            />
            <input
              style={{ marginRight: '25px' }}
              type="text"
              value={todo.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleTitleChange(todo.id, e.target.value)}
            />
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
