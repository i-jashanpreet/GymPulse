import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';

const AnalyticsScreen: React.FC = () => {
    const defaultDays = [
        { label: 'M', height: 92, color: styles.bgRed },
        { label: 'T', height: 60, color: styles.bgOrange },
        { label: 'W', height: 50, color: styles.bgOrange },
        { label: 'T', height: 25, color: styles.bgGreen },
        { label: 'F', height: 68, color: styles.bgOrange },
        { label: 'S', height: 100, color: styles.bgRed }
    ];

    const [days, setDays] = useState(defaultDays.map(d => ({ ...d, height: 0 })));

    useEffect(() => {
        // Animate up from 0
        const timer = setTimeout(() => {
            setDays(defaultDays);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`${styles.screen} ${styles.analyticsScreen}`}>
            <div className={styles.dashboardLayout}>
                <div className={styles.liveViewHeader}>
                    <img src={logo} alt="Rishihood Logo" className={styles.brandLogoTopLeft} />
                    <h2>Analytics</h2>
                    <p>Weekly insights & recommendations</p>
                </div>

                <div className={styles.analyticsContainer}>
                    {/* Weekly Chart */}
                    <div className={styles.analyticsCard}>
                        <h3>Busiest Days Last Week</h3>
                        <div className={styles.barChartContainer}>
                            {days.map((day, index) => (
                                <div key={index} className={styles.barItem}>
                                    <div className={`${styles.bar} ${day.color}`} style={{ height: `${day.height}%` }}></div>
                                    <span className={styles.dayLabel}>{day.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highlights Grid */}
                    <div className={styles.highlightsGrid}>
                        <div className={styles.highlightCard}>
                            <h4>Less Crowded</h4>
                            <div className={styles.highlightValue}>Thursday</div>
                            <div className={`${styles.highlightTrend} ${styles.positive}`}>Study Day</div>
                        </div>
                        <div className={styles.highlightCard}>
                            <h4>Most Crowded</h4>
                            <div className={styles.highlightValue}>Saturday</div>
                            <div className={`${styles.highlightTrend} ${styles.negative}`}>Weekend Peak</div>
                        </div>
                    </div>

                    {/* Recommended Workout Slots */}
                    <div className={styles.analyticsCard}>
                        <h3>Recommended Slots Today</h3>
                        <div className={styles.slotsList}>
                            <div className={styles.slotItem}>
                                <div className={styles.slotTime}>
                                    <Clock size={16} className={styles.textGreen} />
                                    <span>6:00 AM - 7:00 AM</span>
                                </div>
                                <span className={`${styles.statusBadge} ${styles.green}`}>Empty</span>
                            </div>
                            <div className={styles.slotItem}>
                                <div className={styles.slotTime}>
                                    <Clock size={16} className={styles.textOrange} />
                                    <span>9:00 PM - 10:00 PM</span>
                                </div>
                                <span className={`${styles.statusBadge} ${styles.orange}`}>Moderate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsScreen;
