import './Header.css';
import { Link } from 'react-router-dom';

function NavItem({ title, to }) {
    return (
        <li class="nav-item">
            <Link to={to} class="nav-link">{title}</Link>
        </li>
    );
}



export default NavItem;