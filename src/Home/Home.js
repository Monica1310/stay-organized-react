import { useState } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';


function Home() {
  

    return (
        <>
            <div class="container">
                <h1 class="text-center my-4">Welcome to Stay Organized</h1>
                <p class="lead text-center">Manage your tasks effectively and Stay Organized!</p>
                <div class="text-center">
                    <Link to='/user-todos' class="btn btn-primary my-8">View ToDos</Link>
                    <Link to='/new-todo' class="btn btn-success my-8">Add New ToDo</Link>
                    <Link to='/new-user' class="btn btn-info ml-8">Register</Link>
                </div>
            </div>

            <div class="container mt-5">
                <h1 class="text-center">User Graphical Report</h1>
                <div class="form-group">
                    <label for="userSelect">Select User:</label>
                    <select id="userSelect" class="form-control">
                       
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="userChart"></canvas>
                </div>
                <div id="userReport" class="mt-3 text-center"></div>
            </div>
        </>
    )
}


export default Home;