import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const email = localStorage.getItem('userEmail') || 'arjan.singh@rishihood.edu.in';
  
  const extractNameFromEmail = (emailStr: string) => {
      const username = emailStr.split('@')[0];
      return username
          .split(/[._-]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  };

  const userName = extractNameFromEmail(email);
  const avatarUrl = email === 'arjan.singh@rishihood.edu.in' 
    ? 'https://i.pravatar.cc/150?u=a042581f4e29026704d' 
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=150&color=fff`;

  return (
    <div className={`${styles.screen} ${styles.profileScreen}`}>
       <div className={styles.profileLayout}>
          <div className={styles.profileHeader}>
            <img src={logo} alt="Rishihood Logo" className={styles.brandLogoTopLeft} />
            <h3>Profile</h3>
            <div className={styles.profileAvatarLarge}>
                <img src={avatarUrl} alt={`${userName} Profile`} />
            </div>
            <h3>{userName}</h3>
            <p className={styles.profileDept}>Computer Science Dept.</p>
          </div>

          <div className={styles.profileContent}>
            


            {/* Settings Card */}
            <div className={styles.profileCard}>
                <div className={styles.profileCardHeader}>
                    <Settings size={20} style={{ color: 'var(--secondary-maroon)' }} />
                    <h4>App Settings</h4>
                </div>
                
                <div className={styles.settingsRow}>
                    <span>Push Notifications</span>
                    <label className={styles.switch}>
                        <input type="checkbox" defaultChecked />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                </div>
                
                <div className={styles.settingsRow}>
                    <span>Dark Mode</span>
                    <label className={styles.switch}>
                        <input 
                            type="checkbox" 
                            checked={isDarkMode} 
                            onChange={toggleDarkMode}
                        />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                </div>
            </div>

            {/* Logout Button */}
            <button 
                className={`${styles.btn} ${styles.btnLogout}`} 
                onClick={() => navigate('/login')}
            >
                <LogOut size={20} />
                Logout
            </button>
          </div>
       </div>
    </div>
  );
};

export default ProfileScreen;
