import React from 'react';
import { Bell, Activity, Clock, Dumbbell } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';

const AlertsScreen: React.FC = () => {
    const alerts = [
        {
            id: 1,
            title: 'Gym is less crowded now 🔔',
            desc: 'Current capacity dropped below 40%.',
            time: 'Just now',
            icon: <Bell size={20} />,
            color: styles.bgGreen,
            unread: true
        },
        {
            id: 2,
            title: 'Treadmill available 🏃',
            desc: 'Multiple machines are now free in Cardio Zone.',
            time: '15m ago',
            icon: <Activity size={20} />,
            color: styles.bgGreen,
            unread: false
        },
        {
            id: 3,
            title: 'Peak time starts in 20 mins ⏰',
            desc: 'Anticipating heavier crowd soon.',
            time: '1h ago',
            icon: <Clock size={20} />,
            color: styles.bgOrange,
            unread: false
        },
        {
            id: 4,
            title: 'Weight zone now free 💪',
            desc: 'Bench press area has 2 free spots.',
            time: 'Yesterday',
            icon: <Dumbbell size={20} />,
            color: styles.bgGreen,
            unread: false
        }
    ];

    return (
        <div className={`${styles.screen} ${styles.alertsScreen}`}>
            <div className={styles.dashboardLayout}>
                <div className={styles.alertsHeader}>
                    <img src={logo} alt="Rishihood Logo" className={styles.brandLogoTopLeft} />
                    <div className={styles.alertsHeaderTop}>
                        <h2>Notifications</h2>
                        <div className={styles.toggleContainer}>
                            <span className={styles.toggleLabel}>Push</span>
                            <label className={styles.switch}>
                                <input type="checkbox" defaultChecked />
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </div>
                    </div>
                    <p>Real-time updates & warnings</p>
                </div>

                <div className={styles.alertsList}>
                    {alerts.map(alert => (
                        <div key={alert.id} className={`${styles.alertCard} ${alert.unread ? styles.unread : ''}`}>
                            <div className={`${styles.alertIcon} ${alert.color}`}>
                                {alert.icon}
                            </div>
                            <div className={styles.alertContent}>
                                <h4>{alert.title}</h4>
                                <p>{alert.desc}</p>
                                <span className={styles.alertTime}>{alert.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlertsScreen;
