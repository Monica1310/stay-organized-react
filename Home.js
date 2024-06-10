import { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [userTodos, setUserTodos] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8083/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetch(`http://localhost:8083/api/todos/byuser/${selectedUser}`)
                .then(response => response.json())
                .then(data => {
                    setUserTodos(data);
                    generateChartData(data);
                })
                .catch(error => console.error('Error fetching user todos:', error));
        }
    }, [selectedUser]);

    const generateChartData = (todos) => {
        const categories = ['Low', 'Medium', 'High'];
        const data = categories.map(category => {
            return todos.filter(todo => todo.priority === category).length;
        });

        setChartData({
            labels: categories,
            datasets: [
                {
                    label: 'Number of ToDos',
                    data: data,
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1,
                },
            ],
        });
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <>
            <div className="container">
                <h1 className="text-center my-4">Welcome to Stay Organized</h1>
                <p className="lead text-center">Manage your tasks effectively and Stay Organized!</p>
                <div className="text-center">
                    <Link to='/user-todos' className="btn btn-primary my-8">View ToDos</Link>
                    <Link to='/new-todo' className="btn btn-success my-8">Add New ToDo</Link>
                    <Link to='/new-user' className="btn btn-info ml-8">Register</Link>
                </div>
            </div>

            <div className="container mt-5">
                <h1 className="text-center">User Graphical Report</h1>
                <div className="form-group">
                    <label htmlFor="userSelect">Select User:</label>
                    <select id="userSelect" className="form-control" onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">Select a user</option>
                        {usersOptions}
                    </select>
                </div>
                <div className="chart-container">
                    {chartData && <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'User ToDos by Priority' } } }} />}
                </div>
                <div id="userReport" className="mt-3 text-center"></div>
            </div>
        </>
    );
}

export default Home;
