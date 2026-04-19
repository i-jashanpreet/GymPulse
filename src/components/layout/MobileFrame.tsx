import React from 'react';
import styles from './MobileFrame.module.css';

interface MobileFrameProps {
  children: React.ReactNode;
}

const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className={styles.mobileFrame}>
      <div className={styles.appContainer}>
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
