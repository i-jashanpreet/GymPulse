import React from 'react';
import { Clock, Zap } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';
import { useGymData } from '../../context/DataContext';

const HomeScreen: React.FC = () => {
  const { data } = useGymData();
  const crowdCount = data.totalCrowd;

  const email = localStorage.getItem('userEmail') || 'arjan.singh@rishihood.edu.in';
  const firstName = email.split('@')[0].split(/[._-]/)[0];
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  let statusClass = styles.yellow;
  let statusText = 'Medium';
  if (crowdCount < 35) {
    statusClass = styles.green;
    statusText = 'Low';
  } else if (crowdCount > 75) {
    statusClass = styles.red;
    statusText = 'Busy';
  }
  return (
    <div className={`${styles.screen} ${styles.homeScreen}`}>
      <div className={styles.dashboardLayout}>
        {/* Top Section */}
        <div className={styles.liveViewHeader}>
          <img src={logo} alt="Rishihood Logo" className={styles.brandLogoTopLeft} />
          <h2 style={{ fontSize: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            Hi {capitalizedFirstName} <span className={styles.wave}>👋</span>
          </h2>
          <p>Today, 16 April</p>
        </div>

        {/* Main Crowd Card */}
        <div className={styles.mainCrowdCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Live Crowd Status</h3>
            <div className={styles.statusIndicator}>
              <span className={`${styles.indicatorCircle} ${statusClass}`}></span>
              <span className={styles.statusText}>{statusText}</span>
            </div>
          </div>
          
          <div className={styles.crowdNumbers}>
            <div className={styles.countBlock}>
              <span className={styles.bigNumber}>{crowdCount}</span>
              <div className={styles.labelStack}>
                <span className={styles.labelTop}>Students</span>
                <span className={styles.labelBottom}>inside</span>
              </div>
            </div>
            
            <div className={styles.capacityBlock}>
              <span className={styles.divider}>/</span>
              <div className={styles.capacityData}>
                <span className={styles.smallNumber}>100</span>
                <span className={styles.labelCapacity}>Capacity</span>
              </div>
            </div>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.progressBarBg}>
              <div className={`${styles.progressBarFill} ${statusClass}`} style={{ width: `${crowdCount}%` }}></div>
            </div>
            <div className={styles.progressLabels}>
              <span>Empty</span>
              <span>Full</span>
            </div>
          </div>
        </div>

        {/* Below Cards Section */}
        <div className={styles.infoCardsGrid}>
          <div className={styles.infoCard}>
            <div className={`${styles.iconWrapper} ${styles.orange}`}>
              <Clock size={20} />
            </div>
            <div className={styles.infoContent}>
              <h4>Best Time Today</h4>
              <p>3 PM - 5 PM</p>
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <div className={`${styles.iconWrapper} ${styles.maroon}`}>
              <Zap size={20} />
            </div>
            <div className={styles.infoContent}>
              <h4>Peak Time</h4>
              <p>6 PM - 8 PM</p>
            </div>
          </div>
          
          <div className={`${styles.infoCard} ${styles.fullWidth}`}>
            <div className={`${styles.iconWrapper} ${styles.gray}`}>
               <Clock size={20} />
            </div>
            <div className={styles.infoContent}>
              <h4>Avg Wait Time</h4>
              <p>5 min for popular machines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
