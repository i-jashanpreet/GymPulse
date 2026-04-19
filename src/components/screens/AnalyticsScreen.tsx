import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';

const AnalyticsScreen: React.FC = () => {
    const defaultDays = [
        { label: 'M', height: 30, color: styles.bgGreen },
        { label: 'T', height: 60, color: styles.bgOrange },
        { label: 'W', height: 85, color: styles.bgRed },
        { label: 'T', height: 50, color: styles.bgOrange },
        { label: 'F', height: 40, color: styles.bgGreen },
        { label: 'S', height: 65, color: styles.bgOrange },
        { label: 'S', height: 90, color: styles.bgRed }
    ];

    const [days, setDays] = useState(defaultDays.map(d => ({ ...d, height: 0 })));

    useEffect(() => {
        // Animate up from 0
        const timer = setTimeout(() => {
            setDays(defaultDays);
        }, 100);

        // Keep updating slightly to make it feel "live"
        const interval = setInterval(() => {
            setDays(prev => prev.map((d, i) => {
                const baseHeight = defaultDays[i].height;
                const fluctuate = Math.floor(Math.random() * 7) - 3; // -3 to +3
                return { ...d, height: Math.max(10, Math.min(100, baseHeight + fluctuate)) };
            }));
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
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
                            <h4>Avg Weekly Usage</h4>
                            <div className={styles.highlightValue}>4.2<span className={styles.smallText}>hrs</span></div>
                            <div className={`${styles.highlightTrend} ${styles.positive}`}>+12% vs last wk</div>
                        </div>
                        <div className={styles.highlightCard}>
                            <h4>Most Crowded</h4>
                            <div className={styles.highlightValue}>Wednesday</div>
                            <div className={`${styles.highlightTrend} ${styles.negative}`}>Evening Peak</div>
                        </div>
                    </div>

                    {/* Recommended Workout Slots */}
                    <div className={styles.analyticsCard}>
                        <h3>Recommended Slots Today</h3>
                        <div className={styles.slotsList}>
                            <div className={styles.slotItem}>
                                <div className={styles.slotTime}>
                                    <Clock size={16} className={styles.textGreen} />
                                    <span>7:00 AM - 9:00 AM</span>
                                </div>
                                <span className={`${styles.statusBadge} ${styles.green}`}>Empty</span>
                            </div>
                            <div className={styles.slotItem}>
                                <div className={styles.slotTime}>
                                    <Clock size={16} className={styles.textOrange} />
                                    <span>1:00 PM - 3:00 PM</span>
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
