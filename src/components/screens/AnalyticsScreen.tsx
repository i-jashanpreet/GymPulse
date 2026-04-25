import React from 'react';
import { Clock, Flame } from 'lucide-react';
import styles from './Screen.module.css';
import logo from '../../assets/logo.png';

const generateHeatmap = () => {
    const data = [];
    const totalDays = 30;
    for (let i = 0; i < totalDays; i++) {
        let chance = 0.4 + (i * 0.01); 
        
        const hash = Math.sin(i * 100) * 10000;
        const pseudoRandom = hash - Math.floor(hash);
        
        if (pseudoRandom > chance) data.push(0);
        else if (pseudoRandom > chance * 0.6) data.push(1);
        else if (pseudoRandom > chance * 0.3) data.push(2);
        else data.push(3);
    }
    // Assure a nice streak at the end
    data[29] = 3;
    data[28] = 2;
    data[27] = 3;
    data[26] = 3;
    data[25] = 1;
    return data;
};

const HEATMAP_DATA = generateHeatmap();

const AnalyticsScreen: React.FC = () => {
    // Calculate current streak dynamically from the heatmap data
    const zeroIndex = [...HEATMAP_DATA].reverse().findIndex(level => level === 0);
    const currentStreak = zeroIndex === -1 ? HEATMAP_DATA.length : zeroIndex;

    return (
        <div className={`${styles.screen} ${styles.analyticsScreen}`}>
            <div className={styles.dashboardLayout}>
                <div className={styles.liveViewHeader}>
                    <img src={logo} alt="Rishihood Logo" className={styles.brandLogoTopLeft} />
                    <h2>Progress</h2>
                    <p>Your monthly progress overview</p>
                </div>

                <div className={styles.analyticsContainer}>
                    {/* Activity Streak Heatmap */}
                    <div className={styles.analyticsCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    Monthly Consistency
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px', fontWeight: 500 }}>Your activity over the last 30 days.</p>
                            </div>
                        </div>

                        {/* Calendar Style Heatmap Grid & Streak */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '8px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 14px)', gap: '4px' }}>
                                {HEATMAP_DATA.map((level, index) => {
                                    let bgColor = '#f3f4f6'; // Empty
                                    if (level === 1) bgColor = '#fcd34d'; // Light
                                    if (level === 2) bgColor = '#fb923c'; // Medium
                                    if (level === 3) bgColor = 'var(--primary-orange)'; // High
                                    
                                    const today = new Date();
                                    const boxDate = new Date(today);
                                    boxDate.setDate(today.getDate() - (29 - index));
                                    const dateString = boxDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                                    
                                    return (
                                        <div 
                                            key={index} 
                                            className={styles.heatmapBox}
                                            data-tooltip={dateString}
                                            style={{ 
                                                width: '14px', 
                                                height: '14px', 
                                                borderRadius: '3px', 
                                                backgroundColor: bgColor,
                                                cursor: 'default'
                                            }} 
                                        />
                                    );
                                })}
                            </div>
                            
                            {/* Streak Symbol */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ background: 'rgba(223, 84, 37, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '8px' }}>
                                    <Flame size={28} color="var(--primary-orange)" strokeWidth={2.5} />
                                </div>
                                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{currentStreak}</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Days</span>
                            </div>
                        </div>
                    </div>

                    {/* Time Stats Grid */}
                    <div className={styles.highlightsGrid}>
                        <div className={styles.highlightCard}>
                            <h4 style={{ color: 'var(--text-muted)' }}>Last Week</h4>
                            <div className={styles.highlightValue} style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginTop: '4px' }}>
                                5<span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>h</span> 
                                <span style={{ marginLeft: '4px' }}>30</span><span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>m</span>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-orange)', marginTop: '6px' }}>Total Time</div>
                        </div>
                        <div className={styles.highlightCard}>
                            <h4 style={{ color: 'var(--text-muted)' }}>Last Month</h4>
                            <div className={styles.highlightValue} style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginTop: '4px' }}>
                                22<span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>h</span> 
                                <span style={{ marginLeft: '4px' }}>45</span><span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>m</span>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-orange)', marginTop: '6px' }}>Total Time</div>
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
