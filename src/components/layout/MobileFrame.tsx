import React from 'react';
import styles from './MobileFrame.module.css';
import { BatteryMedium, Wifi, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className={styles.mobileFrame}>
      <div className={styles.statusBar}>
        <div className={styles.time}></div>
        <div className={styles.notch}>
          <div className={styles.camera}></div>
          <div className={styles.speaker}></div>
        </div>
        <div className={styles.statusIcons}>
          <Signal size={14} className={styles.icon} />
          <Wifi size={14} className={styles.icon} />
          <BatteryMedium size={16} className={styles.icon} />
        </div>
      </div>
      <div className={styles.appContainer}>
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
