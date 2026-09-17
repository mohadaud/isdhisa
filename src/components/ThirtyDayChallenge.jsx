import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ThirtyDayChallenge() {
  const [completedDays, setCompletedDays] = useLocalStorage('challenge_completed', []);

  const toggleDay = (day) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const daysArray = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '24px' }}>30-Day Calisthenics Challenge</h2>
      <p style={{ marginBottom: '24px' }}>Click on a day to mark it as completed!</p>
      
      <div className="challenge-grid">
        {daysArray.map(day => {
          const isCompleted = completedDays.includes(day);
          return (
            <div 
              key={day} 
              className={`day-box ${isCompleted ? 'completed' : ''}`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <h3>Progress: {completedDays.length} / 30 Days</h3>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '12px', overflow: 'hidden' }}>
          <div style={{ width: `${(completedDays.length / 30) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>
    </div>
  );
}
