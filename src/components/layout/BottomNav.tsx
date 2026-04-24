import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Bell, User } from 'lucide-react';
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
        <BarChart3 size={20} />
        <span>Analytics</span>
      </NavLink>
      <NavLink 
        to="/alerts" 
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <Bell size={20} />
        <span>Alerts</span>
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
