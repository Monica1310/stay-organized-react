import { useEffect, useState } from "react";
import "./UserTodos.css";

function UserTodos() {
  const [usersLoading, setUsersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDeadline, setEditDeadline] = useState("");

  useEffect(() => {
    fetch('http://localhost:8083/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSelectChange = (event) => {
    setLoading(true);

    fetch(`http://localhost:8083/api/todos/byuser/${event.target.value}`)
      .then(response => response.json())
      .then(todos => {
        setTodos(todos);
        setLoading(false);
      }).catch((e) => setLoading(false));
  };

  const handleEdit = (todo) => {
    setEditTodoId(todo.id);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setEditDeadline(todo.deadline);
  };

  const handleSave = (id) => {
    const updatedTodo = {
      description: editDescription,
      priority: editPriority,
      deadline: editDeadline,
    };

    fetch(`http://localhost:8083/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(response => response.json())
      .then(data => {
        setTodos(todos.map(todo => (todo.id === id ? data : todo)));
        setEditTodoId(null);
      })
      .catch(error => console.error('Error updating ToDo:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8083/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setTodos(todos.filter(todo => todo.id !== id));
        }
      })
      .catch(error => console.error('Error deleting ToDo:', error));
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
      <td>
        {editTodoId === todo.id ? (
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        ) : (
          todo.description
        )}
      </td>
      <td>
        {editTodoId === todo.id ? (
          <input
            type="date"
            value={editDeadline}
            onChange={(e) => setEditDeadline(e.target.value)}
          />
        ) : (
          todo.deadline
        )}
      </td>
      <td>
        {editTodoId === todo.id ? (
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        ) : (
          todo.priority
        )}
      </td>
      <td className="text-center">
        {editTodoId === todo.id ? (
          <button className="btn btn-success btn-sm mr-2" onClick={() => handleSave(todo.id)}>
            Save
          </button>
        ) : (
          <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(todo)}>
            Edit
          </button>
        )}
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(todo.id)}>
          Delete
        </button>
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
          <option value="">Select a user</option>
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
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody id="userTodosBody">{todosList}</tbody>
        </table>
      )}
    </div>
  );
}

export default UserTodos;
