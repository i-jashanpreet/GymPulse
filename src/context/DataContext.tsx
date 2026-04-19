import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ZoneData {
    name: string;
    maxCapacity: number;
    currentOccupancy: number;
}

export interface GymData {
    totalCrowd: number;
    maxTotalCapacity: number;
    zones: {
        cardio: ZoneData;
        weights: ZoneData;
        yoga: ZoneData;
        treadmills: ZoneData;
    };
}

interface GymDataContextType {
    data: GymData;
}

const GymDataContext = createContext<GymDataContextType | undefined>(undefined);

export const useGymData = () => {
    const context = useContext(GymDataContext);
    if (!context) {
        throw new Error('useGymData must be used within a GymDataProvider');
    }
    return context;
};

export const GymDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<GymData>({
        totalCrowd: 42,
        maxTotalCapacity: 100,
        zones: {
            cardio: { name: 'Cardio Zone', maxCapacity: 25, currentOccupancy: 18 },
            weights: { name: 'Weight Zone', maxCapacity: 40, currentOccupancy: 22 },
            yoga: { name: 'Yoga Room', maxCapacity: 20, currentOccupancy: 2 },
            treadmills: { name: 'Treadmills', maxCapacity: 15, currentOccupancy: 10 }
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                // Fluctuate each zone individually, simulating people moving around.
                const newZones = {
                    cardio: { ...prev.zones.cardio, currentOccupancy: Math.max(0, Math.min(prev.zones.cardio.maxCapacity, prev.zones.cardio.currentOccupancy + Math.floor(Math.random() * 5) - 2)) },
                    weights: { ...prev.zones.weights, currentOccupancy: Math.max(0, Math.min(prev.zones.weights.maxCapacity, prev.zones.weights.currentOccupancy + Math.floor(Math.random() * 5) - 2)) },
                    yoga: { ...prev.zones.yoga, currentOccupancy: Math.max(0, Math.min(prev.zones.yoga.maxCapacity, prev.zones.yoga.currentOccupancy + Math.floor(Math.random() * 3) - 1)) },
                    treadmills: { ...prev.zones.treadmills, currentOccupancy: Math.max(0, Math.min(prev.zones.treadmills.maxCapacity, prev.zones.treadmills.currentOccupancy + Math.floor(Math.random() * 3) - 1)) }
                };

                // The total crowd is perfectly deterministic based on internal zones.
                const newTotal = Object.values(newZones).reduce((acc, zone) => acc + zone.currentOccupancy, 0);

                return {
                    ...prev,
                    totalCrowd: newTotal,
                    zones: newZones
                };
            });
        }, 3500); // Pulse every 3.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <GymDataContext.Provider value={{ data }}>
            {children}
        </GymDataContext.Provider>
    );
};
