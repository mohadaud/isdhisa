import React from 'react';
import { Award, Star, Zap, Heart, Trophy } from 'lucide-react';

const BADGES = [
  { id: 1, title: 'First Step',       desc: '1-day streak',   icon: '⭐', requiredStreak: 1,  color: '#fee440' },
  { id: 2, title: 'On Fire',          desc: '3-day streak',   icon: '🔥', requiredStreak: 3,  color: '#ff9a9e' },
  { id: 3, title: 'Dedicated',        desc: '7-day streak',   icon: '💜', requiredStreak: 7,  color: '#c084fc' },
  { id: 4, title: 'Champion',         desc: '14-day streak',  icon: '🏅', requiredStreak: 14, color: '#f15bb5' },
  { id: 5, title: 'Lavender Legend',  desc: '30-day streak',  icon: '🌿', requiredStreak: 30, color: '#06d6a0' },
];

export default function Badges({ streak }) {
  const nextBadge = BADGES.find(b => b.requiredStreak > streak);
  const remaining = nextBadge ? nextBadge.requiredStreak - streak : 0;

  return (
    <div className="glass-card">
      <h2>Achievements 🏆</h2>

      <div style={{
        marginBottom: '28px', padding: '16px 20px',
        background: 'rgba(155,93,229,0.08)', border: '1px solid rgba(155,93,229,0.15)',
        borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Current streak: <strong style={{ color: 'white' }}>{streak} days</strong>
        </p>
        {nextBadge && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Next badge in <strong style={{ color: nextBadge.color }}>{remaining} day{remaining !== 1 ? 's' : ''}</strong>
          </p>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px'
      }}>
        {BADGES.map((badge, i) => {
          const isUnlocked = streak >= badge.requiredStreak;
          return (
            <div
              key={badge.id}
              className={isUnlocked ? 'badge-unlocked' : ''}
              style={{
                padding: '24px 16px',
                borderRadius: '14px',
                border: `1px solid ${isUnlocked ? badge.color + '44' : 'rgba(255,255,255,0.05)'}`,
                background: isUnlocked
                  ? `radial-gradient(ellipse at 50% 0%, ${badge.color}18 0%, transparent 70%)`
                  : 'rgba(0,0,0,0.25)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center',
                opacity: isUnlocked ? 1 : 0.35,
                filter: isUnlocked ? 'none' : 'grayscale(1)',
                transition: 'opacity var(--dur-normal) var(--ease-out), filter var(--dur-normal) var(--ease-out)',
                animationDelay: `${i * 50}ms`,
              }}
            >
              <div style={{
                width: '68px', height: '68px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', marginBottom: '14px',
                background: isUnlocked ? `${badge.color}22` : 'rgba(255,255,255,0.05)',
                border: `2px solid ${isUnlocked ? badge.color + '55' : 'transparent'}`,
                boxShadow: isUnlocked ? `0 0 24px ${badge.color}44` : 'none',
                transition: 'box-shadow var(--dur-normal) var(--ease-out)',
              }}>
                {badge.icon}
              </div>
              <h3 style={{ color: isUnlocked ? 'var(--text-light)' : 'var(--text-muted)', marginBottom: '4px' }}>
                {badge.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: isUnlocked ? badge.color : 'var(--text-muted)' }}>
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
