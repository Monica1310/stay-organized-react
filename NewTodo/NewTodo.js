import './NewTodo.css';
import { useState, useEffect } from 'react';

function NewTodo() {
    const [usersLoading, setUsersLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userid, setUserid] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        setUsersLoading(true);
        fetch("http://localhost:8083/api/users")
          .then((response) => response.json())
          .then((users) => {
            setUsers(users);
            setUsersLoading(false);
          })
          .catch(() => setUsersLoading(false));
      }, []);

    useEffect(() => {
        fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(categories => {
            setCategories(categories);
        });
      }, []);

    if (usersLoading) {
        return <h6>Getting users....</h6>;
    } 

    const handleOnSave = (e) => {
        e.preventDefault();

        const newTodo = {
            userid: parseInt(userid),  // Ensure it's a number
            category,
            description,
            deadline,
            priority
        };

        fetch('http://localhost:8083/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
        .then(response => response.json())
        .then(data => {
            alert('ToDo added successfully!');
            // Reset form fields
            setUserid('');
            setCategory('');
            setDescription('');
            setDeadline('');
            setPriority('Low');
        })
        .catch(error => console.error('Error:', error));
    }

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
    ));

    const categoriesOptions = categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
    ));

    return (
        <>
            <div className="container">
                <h1 className="text-center my-4">Add New ToDo</h1>
                <form onSubmit={handleOnSave}>
                    <div className="form-group text-left">
                        <label htmlFor="userSelect">Select User:</label>
                        <select id="userSelect"
                                className="form-control"
                                value={userid}
                                onChange={(e) => setUserid(e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {usersOptions}
                        </select>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="categorySelect">Category:</label>
                        <select id="categorySelect" className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category</option>
                            {categoriesOptions}
                        </select>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" className="form-control" rows="4" required 
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="deadline">Deadline:</label>
                        <input type="date" id="deadline" className="form-control" required 
                               value={deadline}
                               onChange={(e) => setDeadline(e.target.value)} />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="prioritySelect">Priority:</label>
                        <select id="prioritySelect" className="form-control" required 
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Add ToDo</button>
                </form>
            </div>
            <br></br>
        </>
    );
}

export default NewTodo;
