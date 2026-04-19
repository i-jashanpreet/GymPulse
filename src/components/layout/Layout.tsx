import React from 'react';
import { useLocation } from 'react-router-dom';
import MobileFrame from './MobileFrame';
import BottomNav from './BottomNav';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const showNav = !['/', '/login'].includes(location.pathname);

  return (
    <MobileFrame>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}
          >
            {React.isValidElement(children) 
              ? React.cloneElement(children as React.ReactElement<any>, { location, key: location.pathname }) 
              : children}
          </motion.div>
        </AnimatePresence>
        {showNav && <BottomNav />}
      </div>
    </MobileFrame>
  );
};

export default Layout;
