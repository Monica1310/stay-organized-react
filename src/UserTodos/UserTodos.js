import { useEffect, useState } from "react";
import "./UserTodos.css";

function UserTodos() {
  const [usersLoading, setUsersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  // src/components/ViewToDos.js
useEffect(() => {
  fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Error fetching users:', error));
}, []);


  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleSelectChange = (event) => {
    setLoading(true);

    console.log(event.target.value);

    fetch(`http://localhost:8083/api/todos/byuser/${event.target.value}`)
            .then(response => response.json())
            .then(todos => {
                setTodos(todos);
                setLoading(false);
            }).catch((e)=>setLoading(false));
  };

  if (usersLoading) {
    return <h6>Getting users....</h6>;
  } 

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const todosList = todos.map((todo) => (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>{todo.description}</td>
      <td>{todo.deadline}</td>
      <td>{todo.priority}</td>
      <td className="text-center">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(todo.id)}
          checked={todo.completed}
        />
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <h1 className="text-center my-4">User View</h1>
      <div className="form-group">
        <label htmlFor="userSelect" className="text-left">
          Select User:
        </label>
        <select
          id="userSelect"
          className="form-control"
          onChange={handleSelectChange}
        >
          {usersOptions}
        </select>
      </div>
      {loading ? (
        <h6>Loading....</h6>
      ) : (
        <table id="userTodosTable" className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th className="text-center">Completed</th>
            </tr>
          </thead>
          <tbody id="userTodosBody">{todosList}</tbody>
        </table>
      )}
    </div>
  );
}

export default UserTodos;
