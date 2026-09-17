import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, Trash2, TrendingUp } from 'lucide-react';

const EXERCISES = ['Push-ups', 'Squats', 'Plank (Seconds)', 'Lunges', 'Isometric Hold (Seconds)', 'Glute Bridge', 'Mountain Climbers'];

export default function WorkoutTracker() {
  const [trackerData, setTrackerData] = useLocalStorage('workout_tracker_history', []);
  const [exercise, setExercise] = useState(EXERCISES[0]);
  const [reps, setReps] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!reps || isNaN(reps) || parseInt(reps) <= 0) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB'),
      exercise,
      reps: parseInt(reps),
    };
    setTrackerData([newEntry, ...trackerData]);
    setReps('');
  };

  const handleDelete = (id) => {
    setTrackerData(trackerData.filter(e => e.id !== id));
  };

  // Best reps for the selected exercise
  const best = trackerData
    .filter(e => e.exercise === exercise)
    .reduce((max, e) => Math.max(max, e.reps), 0);

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {/* Log panel */}
      <div className="glass-card" style={{ flex: '1 1 280px' }}>
        <h2 style={{ marginBottom: '20px' }}>Log Exercise</h2>

        {best > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px',
            padding: '10px 14px', borderRadius: '8px',
            background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)'
          }}>
            <TrendingUp size={16} color="#06d6a0" />
            <p style={{ color: '#a3f0dc', fontSize: '0.85rem' }}>
              Personal best: <strong>{best} reps</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleAdd}>
          <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 500 }}>
            Exercise
          </label>
          <select value={exercise} onChange={e => setExercise(e.target.value)}>
            {EXERCISES.map(ex => <option key={ex} value={ex}>{ex}</option>)}
          </select>

          <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 500 }}>
            Reps / Duration
          </label>
          <input
            id="reps-input"
            type="number"
            value={reps}
            min="1"
            onChange={e => setReps(e.target.value)}
            placeholder="e.g. 15"
            required
          />

          <button id="add-exercise-btn" type="submit" className="btn-primary">
            <Plus size={18} /> Add to Log
          </button>
        </form>
      </div>

      {/* History panel */}
      <div className="glass-card" style={{ flex: '2 1 360px' }}>
        <h2 style={{ marginBottom: '20px' }}>Workout History</h2>
        {trackerData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🏋️</div>
            <p>No exercises logged yet. Start working out!</p>
          </div>
        ) : (
          <div
            style={{
              display: 'flex', flexDirection: 'column', gap: '10px',
              maxHeight: '480px', overflowY: 'auto', paddingRight: '4px'
            }}
          >
            {trackerData.map((entry, i) => (
              <div
                key={entry.id}
                className="history-item"
                style={{
                  animationDelay: `${Math.min(i * 40, 240)}ms`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '2px' }}>{entry.exercise}</h4>
                  <small style={{ color: 'var(--text-muted)' }}>{entry.date}</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900 }}>{entry.reps}</span>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    aria-label="Delete entry"
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: 'var(--text-muted)', padding: '4px',
                      transition: 'color 120ms ease',
                      borderRadius: '4px',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff6b6b'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
