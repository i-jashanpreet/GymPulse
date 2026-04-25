import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const appName = "GymPulse";
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 }
    }
  };

  return (
    <div 
        className={`${styles.screen} ${styles.splashScreen}`}
        onClick={() => navigate('/login')}
    >
      <div className={styles.splashContent}>
        <div className={styles.logoContainer}>
          <motion.div 
            className={styles.logoImgContainer}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          >
            <img src={logo} alt="Rishihood University Logo" className={styles.brandLogoImg} />
          </motion.div>
          <motion.h1 
            className={styles.appName}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.5
                }
              }
            }}
          >
            {appName.split('').map((char, index) => (
              <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
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
