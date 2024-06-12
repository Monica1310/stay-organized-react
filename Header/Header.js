import userprofile from '../Images/user.jpg';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {

    const navItemsList = [
        { 'title': "Home", 'to': '/' },
        { 'title': "View ToDos", 'to': '/user-todos' },
        { 'title': "Add New ToDo", 'to': '/new-todo' },
        { 'title': "Register", 'to': '/new-user' },
    ];

    const navItems = navItemsList.map((navItem) => <NavItem title={navItem.title} to={navItem.to} />);


    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <li class="logo"><Link to='/' id="logo-link">Stay Organized</Link></li>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    {navItems}
                    <img src={userprofile} alt="User Image" id="user-image" />
                </ul>
            </div>
        </nav>
    )
}


export default Header;