import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mealPlan } from '../data/mealData';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Apple } from 'lucide-react';

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];
const MEAL_LABELS = { breakfast: '🌅 Quraac', lunch: '☀️ Qado', dinner: '🌙 Casho', snack: '🍎 Cunno Yar' };

export default function MealPlan() {
  const [checkedMeals, setCheckedMeals] = useLocalStorage('meal_checked', {}); 
  // shape: { "day-1-breakfast": true, "day-1-lunch": true, ... }
  
  const [expandedDay, setExpandedDay] = useState(() => {
    // Auto-expand today's day (1-30 cycling)
    const dayOfChallenge = ((new Date().getDate() - 1) % 30) + 1;
    return dayOfChallenge;
  });

  const toggleMeal = (day, mealType) => {
    const key = `day-${day}-${mealType}`;
    setCheckedMeals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isMealChecked = (day, mealType) => !!checkedMeals[`day-${day}-${mealType}`];

  const getDayProgress = (day) => {
    return MEAL_TYPES.filter(t => isMealChecked(day, t)).length;
  };

  const getTotalChecked = () => Object.values(checkedMeals).filter(Boolean).length;
  const totalMeals = 30 * 4;

  const getDayCalories = (day) => {
    const plan = mealPlan[day - 1];
    return MEAL_TYPES.reduce((sum, t) => sum + plan[t].calories, 0);
  };

  return (
    <div>
      {/* Header stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px', marginBottom: '28px'
      }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Cuntooyin La Cuntay</p>
          <div className="stat-value" style={{ fontSize: '2.2rem' }}>{getTotalChecked()}</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>/ {totalMeals} Cunno</p>
          <div className="progress-bar-track" style={{ marginTop: '12px' }}>
            <div className="progress-bar-fill" style={{ width: `${(getTotalChecked() / totalMeals) * 100}%` }} />
          </div>
        </div>
        <div className="glass-card">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px' }}>Budget Kharashka</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(6,214,160,0.15)', color: '#06d6a0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600 }}>💚 Jaban — Maalin walba</span>
            <span style={{ background: 'rgba(254,228,64,0.15)', color: '#fee440', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600 }}>💛 Dhexe — Usbuuc kasta 1–2</span>
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.85rem' }}>~1,750–2,000 kcal/maalin</p>
        </div>
        <div className="glass-card">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px' }}>Cuntada Ugu Muhiimsan</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {['🥚 Ukun — Protein aasaasi ah', '🐟 Kaluun — Jaban & Protein badan', '🫘 Digir — Fibre + Protein', '🍌 Muus — Tamar jimicsi'].map(item => (
              <p key={item} style={{ fontSize: '0.82rem', color: '#c084fc' }}>{item}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 30-day list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {mealPlan.map((dayPlan) => {
          const progress = getDayProgress(dayPlan.day);
          const isExpanded = expandedDay === dayPlan.day;
          const isComplete = progress === 4;
          const calories = getDayCalories(dayPlan.day);

          return (
            <div
              key={dayPlan.day}
              style={{
                background: isComplete
                  ? 'rgba(6,214,160,0.07)'
                  : 'rgba(35,22,65,0.45)',
                border: `1px solid ${isComplete ? 'rgba(6,214,160,0.25)' : 'rgba(155,93,229,0.12)'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 220ms cubic-bezier(0.23,1,0.32,1)',
                animation: `contentIn 260ms cubic-bezier(0.23,1,0.32,1) ${Math.min(dayPlan.day * 20, 400)}ms both`,
              }}
            >
              {/* Day header — clickable to expand */}
              <button
                onClick={() => setExpandedDay(isExpanded ? null : dayPlan.day)}
                style={{
                  width: '100%', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'var(--text-light)', fontFamily: 'inherit',
                  transition: 'background 120ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,93,229,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Progress circles */}
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: isComplete
                      ? 'linear-gradient(135deg, #06d6a0, #059669)'
                      : 'rgba(155,93,229,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
                    boxShadow: isComplete ? '0 0 16px rgba(6,214,160,0.4)' : 'none',
                    transition: 'background 220ms ease, box-shadow 220ms ease',
                  }}>
                    {isComplete ? '✓' : dayPlan.day}
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 700, color: isComplete ? '#a3f0dc' : 'var(--text-light)', fontSize: '0.95rem' }}>
                      Maalinta {dayPlan.day}
                      {dayPlan.day === 30 && ' 🎉'}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {progress}/4 cunno · {calories} kcal
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Mini progress dots */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {MEAL_TYPES.map(t => (
                      <div key={t} style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: isMealChecked(dayPlan.day, t)
                          ? '#06d6a0'
                          : 'rgba(255,255,255,0.12)',
                        transition: 'background 160ms ease',
                      }} />
                    ))}
                  </div>
                  <div style={{ color: 'var(--text-muted)', transition: 'transform 220ms cubic-bezier(0.23,1,0.32,1)', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              {/* Expanded meal rows */}
              {isExpanded && (
                <div style={{
                  borderTop: '1px solid rgba(155,93,229,0.12)',
                  padding: '12px 20px 16px',
                  display: 'flex', flexDirection: 'column', gap: '8px',
                  animation: 'contentIn 200ms cubic-bezier(0.23,1,0.32,1) both',
                }}>
                  {MEAL_TYPES.map((mealType, i) => {
                    const meal = dayPlan[mealType];
                    const checked = isMealChecked(dayPlan.day, mealType);
                    return (
                      <button
                        key={mealType}
                        onClick={() => toggleMeal(dayPlan.day, mealType)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '14px',
                          padding: '12px 14px', borderRadius: '10px', border: 'none',
                          background: checked ? 'rgba(6,214,160,0.1)' : 'rgba(0,0,0,0.2)',
                          cursor: 'pointer', fontFamily: 'inherit',
                          transition: 'background 160ms ease, transform 120ms cubic-bezier(0.23,1,0.32,1)',
                          animation: `contentIn 200ms cubic-bezier(0.23,1,0.32,1) ${i * 40}ms both`,
                          width: '100%', textAlign: 'left',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'translateX(4px)'}
                      >
                        <span style={{ color: checked ? '#06d6a0' : 'var(--text-muted)', flexShrink: 0, transition: 'color 160ms ease' }}>
                          {checked
                            ? <CheckCircle2 size={20} />
                            : <Circle size={20} />
                          }
                        </span>
                        <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{meal.emoji}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            color: checked ? '#a3f0dc' : 'var(--text-light)',
                            fontWeight: 500, fontSize: '0.9rem',
                            textDecoration: checked ? 'line-through' : 'none',
                            opacity: checked ? 0.7 : 1,
                            transition: 'all 160ms ease',
                          }}>
                            {meal.name}
                          </p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                            {MEAL_LABELS[mealType]} · {meal.calories} kcal · Protein {meal.protein}
                          </p>
                        </div>
                        <span style={{
                          fontSize: '0.72rem', padding: '3px 8px', borderRadius: '12px', flexShrink: 0,
                          background: meal.budget.includes('Jaban')
                            ? 'rgba(6,214,160,0.12)'
                            : 'rgba(254,228,64,0.12)',
                          color: meal.budget.includes('Jaban') ? '#06d6a0' : '#fee440',
                          fontWeight: 600,
                        }}>
                          {meal.budget.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
