import './Header.css'
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>

                    <li>
                        <Link to="/admin-dashboard">Admin Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/create-employee">Create Employee</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;