import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ProgressChart({ metrics, setMetrics }) {
  const [weightHistory, setWeightHistory] = useLocalStorage('weight_history', [
    { date: new Date().toLocaleDateString(), weight: metrics.weight }
  ]);
  const [newWeight, setNewWeight] = useState('');

  const handleUpdateWeight = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;
    
    const weightVal = parseFloat(newWeight);
    
    // Update global metrics
    const newBmi = (weightVal / Math.pow(metrics.height / 100, 2)).toFixed(1);
    let status = "Underweight (Miisaan yari ba'an)";
    if (newBmi >= 18.5 && newBmi <= 24.9) status = "Healthy Weight (Miisaan Caafimaad qaba)";
    if (newBmi >= 25) status = "Overweight (Miisaan Dheeri ah)";

    setMetrics({
      ...metrics,
      weight: weightVal,
      bmi: newBmi,
      status
    });

    // Update history for chart
    setWeightHistory([
      ...weightHistory,
      { date: new Date().toLocaleDateString(), weight: weightVal }
    ]);
    
    setNewWeight('');
  };

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <h2>Weight Progress</h2>
        <form onSubmit={handleUpdateWeight} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="number" 
            step="0.1"
            value={newWeight} 
            onChange={(e) => setNewWeight(e.target.value)} 
            placeholder="New Weight (kg)" 
            style={{ marginBottom: 0, width: '150px' }}
          />
          <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Update</button>
        </form>
      </div>

      <div style={{ width: '100%', height: '400px', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="#adb5bd" />
            <YAxis domain={['auto', 'auto']} stroke="#adb5bd" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--primary)' }}
            />
            <Line type="monotone" dataKey="weight" stroke="var(--secondary)" strokeWidth={3} dot={{ r: 6, fill: 'var(--accent)' }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
