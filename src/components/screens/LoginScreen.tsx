import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('userEmail', email);
    }
    navigate('/home');
  };

  const handleQuickLogin = () => {
    localStorage.setItem('userEmail', 'arjan.singh@rishihood.edu.in');
    navigate('/home');
  };

  return (
    <div className={`${styles.screen} ${styles.loginScreen}`}>
      <div className={styles.loginHeader}>
        <div className={styles.logoImgContainerSmall}>
          <img src={logo} alt="Rishihood University Logo" className={styles.brandLogoImgSmall} />
        </div>
      </div>
      
      <div className={styles.loginBody}>
        <div className={styles.welcomeTextContainer}>
          <h2 className={styles.welcomeTitle}>Welcome Back</h2>
          <p className={styles.welcomeSubtitle}>Login with your university credentials</p>
        </div>

        <div className={styles.loginCard}>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="college-email">Student Mail</label>
              <input 
                type="email" 
                id="college-email" 
                placeholder="e.g. student@rishihood.edu.in" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" required />
            </div>
            
            <div className={styles.forgotPassword}>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Login</button>
          </form>
          
          <div className={styles.quickLogin}>
            <button 
                type="button" 
                className={styles.btnFingerprint} 
                aria-label="Login with Fingerprint"
                onClick={handleQuickLogin}
            >
              <Fingerprint size={32} />
            </button>
            <span>Quick Login</span>
          </div>
        </div>
      </div>

      <div className={styles.loginFooter}>
        <p>Only for Rishihood Students</p>
      </div>
    </div>
  );
};

export default LoginScreen;
