import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';
import { useGymData } from '../../context/DataContext';

const HomeScreen: React.FC = () => {
  const defaultDays = [
      { label: 'M', height: 92, color: styles.bgRed, peakTime: '6 PM - 8 PM', lessCrowdTime: '6 AM - 8 AM' },
      { label: 'T', height: 60, color: styles.bgOrange, peakTime: '5 PM - 7 PM', lessCrowdTime: '7 AM - 9 AM' },
      { label: 'W', height: 50, color: styles.bgOrange, peakTime: '6 PM - 8 PM', lessCrowdTime: '8 AM - 10 AM' },
      { label: 'T', height: 25, color: styles.bgGreen, peakTime: '7 PM - 9 PM', lessCrowdTime: '6 AM - 8 AM' },
      { label: 'F', height: 68, color: styles.bgOrange, peakTime: '5 PM - 8 PM', lessCrowdTime: '7 AM - 9 AM' },
      { label: 'S', height: 100, color: styles.bgRed, peakTime: '9 AM - 11 AM', lessCrowdTime: '8 PM - 10 PM' }
  ];

  const [days, setDays] = useState(defaultDays.map(d => ({ ...d, height: 0 })));
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  useEffect(() => {
      const timer = setTimeout(() => {
          setDays(defaultDays);
      }, 100);
      return () => clearTimeout(timer);
  }, []);

  const { data } = useGymData();
  const crowdCount = data.totalCrowd;

  const email = localStorage.getItem('userEmail') || 'arjan.singh@rishihood.edu.in';
  const firstName = email.split('@')[0].split(/[._-]/)[0];
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  let statusClass = styles.yellow;
  let statusText = 'Medium';
  if (crowdCount < 25) {
    statusClass = styles.green;
    statusText = 'Low';
  } else if (crowdCount > 55) {
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
                <span className={styles.smallNumber}>70</span>
                <span className={styles.labelCapacity}>Capacity</span>
              </div>
            </div>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.progressBarBg}>
              <div className={`${styles.progressBarFill} ${statusClass}`} style={{ width: `${Math.min(100, (crowdCount / 70) * 100)}%` }}></div>
            </div>
            <div className={styles.progressLabels}>
              <span>Empty</span>
              <span>Full</span>
            </div>
          </div>
        </div>

        <div className={styles.analyticsContainer} style={{ paddingTop: '12px' }}>
          <div className={styles.analyticsCard}>
              <h3>Busiest Days Last Week</h3>
              <div className={styles.barChartContainer}>
                  {days.map((day, index) => (
                      <div 
                        key={index} 
                        className={styles.barItem}
                        onClick={() => setSelectedDayIndex(index)}
                        style={{ cursor: 'pointer', opacity: selectedDayIndex === index ? 1 : 0.5, transition: 'opacity 0.2s' }}
                      >
                          <div className={`${styles.bar} ${day.color}`} style={{ height: `${day.height}%` }}></div>
                          <span className={styles.dayLabel}>{day.label}</span>
                      </div>
                  ))}
              </div>
          </div>
          
          <div className={styles.highlightsGrid} style={{ paddingTop: '8px' }}>
            <div className={styles.highlightCard} style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '10px' }}>Peak Time</h4>
                <div className={styles.highlightValue} style={{ fontSize: '15px' }}>{defaultDays[selectedDayIndex]?.peakTime}</div>
                <div className={`${styles.highlightTrend} ${styles.negative}`}>Usually Busy</div>
            </div>
            
            <div className={styles.highlightCard} style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '10px' }}>Less Crowded</h4>
                <div className={styles.highlightValue} style={{ fontSize: '15px' }}>{defaultDays[selectedDayIndex]?.lessCrowdTime}</div>
                <div className={`${styles.highlightTrend} ${styles.positive}`}>Best Time</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeScreen;
