import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';
import bannerImg from '../../assets/rishihood_banner.png';

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
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=df5425&size=150&color=fff`;

  return (
    <div className={`${styles.screen} ${styles.profileScreen}`}>
       <div className={styles.profileLayout}>
          <div className={styles.profileHeader}>
            <img src={logo} alt="Rishihood Logo" className={styles.brandLogoTopLeft} />
            <div style={{ height: '64px', width: '100%', background: 'var(--bg-white)' }}></div>
            
            <div 
              className={styles.profileBanner}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 15%'
              }}
            >
                <span>#ApproachingRishihood</span>
            </div>
            
            <div className={styles.profileDetailsLeft}>
                <div className={styles.profileAvatarLarge}>
                    <img src={avatarUrl} alt={`${userName} Profile`} />
                </div>
                <div className={styles.profileText}>
                    <h3>{userName}</h3>
                    <p className={styles.profileDept}>B. Tech (Computer Science & Artificial Intelligence) student at Rishihood University</p>
                    <div className={styles.profileLocation}>
                        <MapPin size={16} />
                        <span>Sonipat, Delhi NCR, Haryana</span>
                    </div>
                </div>
            </div>
          </div>

          <div className={styles.profileContent}>
            


            {/* Settings Card */}
            <div className={styles.profileCard}>
                <div className={styles.profileCardHeader}>
                    <Settings size={20} style={{ color: 'var(--secondary-maroon)' }} />
                    <h4>App Settings</h4>
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
