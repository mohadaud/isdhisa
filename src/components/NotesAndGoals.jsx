import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Save } from 'lucide-react';

export default function NotesAndGoals() {
  const [notes, setNotes] = useLocalStorage('calisthenics_notes', []);
  const [newNote, setNewNote] = useState('');
  
  const [goals, setGoals] = useLocalStorage('calisthenics_goals', [
    { id: 1, text: 'Reach 45kg healthy weight', completed: false },
    { id: 2, text: 'Complete 10 push-ups', completed: false },
    { id: 3, text: 'Stick to the 30-day schedule', completed: false }
  ]);
  const [newGoal, setNewGoal] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([
      { id: Date.now(), text: newNote, date: new Date().toLocaleDateString() },
      ...notes
    ]);
    setNewNote('');
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([
      ...goals,
      { id: Date.now(), text: newGoal, completed: false }
    ]);
    setNewGoal('');
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      <div className="glass-card">
        <h2>My Goals 🎯</h2>
        
        <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input 
            type="text" 
            value={newGoal} 
            onChange={(e) => setNewGoal(e.target.value)} 
            placeholder="Add a new goal..." 
            style={{ marginBottom: 0 }}
          />
          <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Add</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {goals.map(goal => (
            <div 
              key={goal.id} 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', opacity: goal.completed ? 0.6 : 1 }}
              onClick={() => toggleGoal(goal.id)}
            >
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${goal.completed ? 'var(--primary)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: goal.completed ? 'var(--primary)' : 'transparent' }}>
                {goal.completed && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
              </div>
              <span style={{ textDecoration: goal.completed ? 'line-through' : 'none', color: goal.completed ? 'var(--text-muted)' : 'white' }}>
                {goal.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <h2>Daily Journal 📓</h2>
        
        <form onSubmit={handleAddNote} style={{ marginBottom: '24px' }}>
          <textarea 
            rows="4" 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="How was your workout today? How are you feeling?"
          />
          <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Save size={20} /> Save Entry
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>
          {notes.length === 0 ? (
            <p>No journal entries yet.</p>
          ) : (
            notes.map(note => (
              <div key={note.id} style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderLeft: '4px solid var(--secondary)', borderRadius: '0 8px 8px 0' }}>
                <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>{note.date}</small>
                <p style={{ color: 'var(--text-light)' }}>{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
