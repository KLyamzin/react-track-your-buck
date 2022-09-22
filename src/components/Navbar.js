import styles from './Navbar.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
  const { logout } = useLogout();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>My Money</li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="btn" onClick={logout}>
          Logout
        </li>
      </ul>
    </nav>
  );
}
