import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, TrendingUp, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const BottomNav: React.FC = () => {
  return (
    <nav className={styles.bottomNav}>
      <NavLink 
        to="/home" 
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink 
        to="/analytics" 
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <TrendingUp size={20} />
        <span>Progress</span>
      </NavLink>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <User size={20} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
