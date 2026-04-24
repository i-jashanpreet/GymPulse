import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';

import AnalyticsScreen from './components/screens/AnalyticsScreen';
import AlertsScreen from './components/screens/AlertsScreen';
import ProfileScreen from './components/screens/ProfileScreen';

import { GymDataProvider } from './context/DataContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GymDataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/home" element={<HomeScreen />} />

              <Route path="/analytics" element={<AnalyticsScreen />} />
              <Route path="/alerts" element={<AlertsScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </GymDataProvider>
    </ThemeProvider>
  );
};

export default App;
