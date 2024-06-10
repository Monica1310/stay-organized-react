import logo from './logo.svg';
import './App.css'
import UserTodos from './UserTodos/UserTodos.js';
import Register from './NewUser/Register.js';
import NewTodo from './NewTodo/NewTodo.js';
import Home from './Home/Home.js';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import NavBar from './Header/Header.js';
import Footer from './Footer/Footer.js';


function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user-todos' element={<UserTodos />} />
          <Route path='/new-todo' element={<NewTodo />} />
          <Route path='/new-user' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
