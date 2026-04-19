import React from 'react';
import { Activity, Dumbbell, Flower, Zap } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';
import { useGymData } from '../../context/DataContext';

const LiveViewScreen: React.FC = () => {
  const { data } = useGymData();

  const getStatus = (zone: any) => {
    const ratio = zone.currentOccupancy / zone.maxCapacity;
    if (ratio > 0.8) return { text: 'Busy', badgeClass: styles.red, bgClass: styles.redBg };
    if (ratio > 0.4) return { text: 'Moderate', badgeClass: styles.orange, bgClass: styles.orangeBg };
    return { text: 'Empty', badgeClass: styles.green, bgClass: styles.greenBg };
  };

  const cardioStatus = getStatus(data.zones.cardio);
  const weightStatus = getStatus(data.zones.weights);
  const yogaStatus = getStatus(data.zones.yoga);
  const treadmillStatus = getStatus(data.zones.treadmills);

  return (
    <div className={`${styles.screen} ${styles.liveViewScreen}`}>
      <div className={styles.dashboardLayout}>
        <div className={styles.liveViewHeader}>
          <img src={logo} alt="Rishihood Logo" className={styles.brandLogoTopLeft} />
          <h2>Live Area Status</h2>
          <p>Gym section-wise crowd updates</p>
        </div>

        <div className={styles.areaCardsContainer}>
          {/* Cardio Zone */}
          <div className={styles.areaCard}>
            <div className={`${styles.areaIconContainer} ${cardioStatus.bgClass}`}>
              <Zap size={24} />
            </div>
            <div className={styles.areaDetails}>
              <h3>Cardio Zone</h3>
              <div className={styles.areaStats}>
                <span className={`${styles.statusBadge} ${cardioStatus.badgeClass}`}>{cardioStatus.text}</span>
                <span className={styles.machinesText}>Free: {data.zones.cardio.maxCapacity - data.zones.cardio.currentOccupancy}</span>
              </div>
            </div>
          </div>

          {/* Weight Zone */}
          <div className={styles.areaCard}>
            <div className={`${styles.areaIconContainer} ${weightStatus.bgClass}`}>
              <Dumbbell size={24} />
            </div>
            <div className={styles.areaDetails}>
              <h3>Weight Zone</h3>
              <div className={styles.areaStats}>
                <span className={`${styles.statusBadge} ${weightStatus.badgeClass}`}>{weightStatus.text}</span>
                <span className={styles.machinesText}>Free: {data.zones.weights.maxCapacity - data.zones.weights.currentOccupancy}</span>
              </div>
            </div>
          </div>

          {/* Yoga Room */}
          <div className={styles.areaCard}>
            <div className={`${styles.areaIconContainer} ${yogaStatus.bgClass}`}>
              <Flower size={24} />
            </div>
            <div className={styles.areaDetails}>
              <h3>Yoga Room</h3>
              <div className={styles.areaStats}>
                <span className={`${styles.statusBadge} ${yogaStatus.badgeClass}`}>{yogaStatus.text}</span>
              </div>
            </div>
          </div>

          {/* Treadmills */}
          <div className={styles.areaCard}>
            <div className={`${styles.areaIconContainer} ${treadmillStatus.bgClass}`}>
              <Activity size={24} />
            </div>
            <div className={styles.areaDetails}>
              <h3>Treadmills</h3>
              <div className={styles.areaStats}>
                <span className={`${styles.statusBadge} ${treadmillStatus.badgeClass}`}>{treadmillStatus.text}</span>
                <span className={styles.machinesText}>Available: {data.zones.treadmills.maxCapacity - data.zones.treadmills.currentOccupancy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveViewScreen;
