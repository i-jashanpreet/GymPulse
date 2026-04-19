import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
        className={`${styles.screen} ${styles.splashScreen}`}
        onClick={() => navigate('/login')}
    >
      <div className={styles.splashContent}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImgContainer}>
            <img src={logo} alt="Rishihood University Logo" className={styles.brandLogoImg} />
          </div>
          <h1 className={styles.appName}>GymPulse</h1>
        </div>
        
        <div className={styles.splashFooter}>
          <p className={styles.tagline}>Know the Best Time to Train</p>
          <div className={styles.loadingAnimation}>
            <div className={styles.loaderBar}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
