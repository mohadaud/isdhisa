import React, { useState } from 'react';
import { CheckCircle, Flame, Apple, Dumbbell, ExternalLink } from 'lucide-react';
import { workoutSchedule } from '../data/workoutData';

export default function Dashboard({ metrics, onCheckIn, lastCheckIn }) {
  const [checkedNow, setCheckedNow] = useState(false);
  const isCheckedInToday = lastCheckIn === new Date().toDateString();

  const todayIndex = new Date().getDay(); // 0=Sun … 6=Sat
  const scheduleIndexMap = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  const todaysWorkout = workoutSchedule.phase1.days[scheduleIndexMap[todayIndex]];

  const handleCheckIn = () => {
    if (!isCheckedInToday) {
      onCheckIn();
      setCheckedNow(true);
    }
  };

  const isRest = !todaysWorkout.videoId;

  return (
    <div>
      {/* KPI row */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <StatCard
          delay={0}
          icon={<Dumbbell size={22} />}
          label="Current Weight"
          value={`${metrics.weight} kg`}
          sub={`${metrics.height} cm • BMI ${metrics.bmi}`}
          subColor={metrics.bmi < 18.5 ? '#ff9a9e' : '#06d6a0'}
          subText={metrics.status}
        />
        <StatCard
          delay={60}
          icon={<Apple size={22} />}
          label="Daily Calorie Goal"
          value={`${metrics.targetCalories}`}
          sub="kcal / day (Calorie Surplus)"
          subColor="var(--accent)"
          subText="Eat more to build muscle! 💪"
        />
        <CheckInCard
          delay={120}
          isCheckedInToday={isCheckedInToday}
          checkedNow={checkedNow}
          onCheckIn={handleCheckIn}
        />
      </div>

      {/* Today's workout card */}
      <div
        className="glass-card"
        style={{
          marginTop: '4px',
          animation: 'contentIn 280ms cubic-bezier(0.23,1,0.32,1) 80ms both',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Today — {todaysWorkout.day}
            </p>
            <h2 style={{ marginBottom: 0 }}>{isRest ? '😴 Nasasho (Rest Day)' : `🏋️ ${todaysWorkout.name}`}</h2>
          </div>
          {!isRest && todaysWorkout.videoId && (
            <a
              href={`https://www.youtube.com/watch?v=${todaysWorkout.videoId}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
                padding: '8px 16px', border: '1px solid rgba(241,91,181,0.3)', borderRadius: '8px',
                transition: 'background 120ms ease, transform 120ms cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(241,91,181,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <ExternalLink size={14} />
              Watch Video
            </a>
          )}
        </div>

        {!isRest ? (
          <div style={{
            marginTop: '20px', padding: '20px',
            background: 'rgba(155,93,229,0.08)', border: '1px solid rgba(155,93,229,0.15)',
            borderRadius: '10px'
          }}>
            <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              {todaysWorkout.task}
            </p>

            {/* Animated exercise visualizer */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['Warm-up 5min', 'Main Set', 'Cool-down 5min'].map((phase, i) => (
                <div key={phase} style={{
                  flex: '1 1 120px', padding: '14px', borderRadius: '10px',
                  background: 'rgba(0,0,0,0.25)', textAlign: 'center',
                  animation: `contentIn 260ms cubic-bezier(0.23,1,0.32,1) ${80 + i * 60}ms both`
                }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
                    {i === 0 ? '🔥' : i === 1 ? '💪' : '🧘'}
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 600 }}>{phase}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(6,214,160,0.07)', border: '1px solid rgba(6,214,160,0.15)', borderRadius: '10px' }}>
            <p style={{ color: '#a3f0dc' }}>
              Nasasho waa muhiim! Rest days help your muscles grow stronger. 
              Cabbirka biyo badan, cun cunto fiican, hurdana wanaagsan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, subColor, subText, delay }) {
  return (
    <div
      className="glass-card"
      style={{ animation: `contentIn 260ms cubic-bezier(0.23,1,0.32,1) ${delay}ms both` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}>
        {icon}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>{label}</p>
      </div>
      <div className="stat-value">{value}</div>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{sub}</p>
      <p style={{ fontSize: '0.85rem', color: subColor, fontWeight: 600 }}>{subText}</p>
    </div>
  );
}

function CheckInCard({ isCheckedInToday, checkedNow, onCheckIn, delay }) {
  return (
    <div
      className="glass-card"
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        animation: `contentIn 260ms cubic-bezier(0.23,1,0.32,1) ${delay}ms both`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', marginBottom: '10px' }}>
        <Flame size={22} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Daily Check-in</p>
      </div>
      <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
        {isCheckedInToday
          ? 'Great work! Come back tomorrow. 🌟'
          : 'Maanta ma sameysay workout?'}
      </p>
      <button
        id="daily-checkin-btn"
        className="btn-primary"
        onClick={onCheckIn}
        disabled={isCheckedInToday}
      >
        {isCheckedInToday
          ? <><CheckCircle size={18} /> Checked In!</>
          : '✅ Check In Now'
        }
      </button>
    </div>
  );
}
