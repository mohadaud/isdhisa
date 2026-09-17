import React, { useState } from 'react';
import { Home, Calendar, Activity, BarChart2, Award, BookOpen, UtensilsCrossed } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultMetrics } from './data/workoutData';

import Dashboard from './components/Dashboard';
import ThirtyDayChallenge from './components/ThirtyDayChallenge';
import WorkoutTracker from './components/WorkoutTracker';
import ProgressChart from './components/ProgressChart';
import Badges from './components/Badges';
import NotesAndGoals from './components/NotesAndGoals';
import MealPlan from './components/MealPlan';

/* Short tab labels for the mobile bottom bar (full labels stay in the sidebar/header) */
const SHORT_LABELS = {
  dashboard: 'Home',
  challenge: '30-Day',
  meals: 'Meals',
  tracker: 'Tracker',
  progress: 'Progress',
  badges: 'Badges',
  notes: 'Notes',
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metrics, setMetrics] = useLocalStorage('calisthenics_metrics', defaultMetrics);
  const [streak, setStreak] = useLocalStorage('calisthenics_streak', 0);
  const [lastCheckIn, setLastCheckIn] = useLocalStorage('calisthenics_last_checkin', null);

  const tabs = [
    { id: 'dashboard',  label: 'Dashboard',        icon: <Home size={18} /> },
    { id: 'challenge',  label: '30-Day Challenge',  icon: <Calendar size={18} /> },
    { id: 'meals',      label: 'Meal Plan 🍽️',      icon: <UtensilsCrossed size={18} /> },
    { id: 'tracker',    label: 'Workout Tracker',   icon: <Activity size={18} /> },
    { id: 'progress',   label: 'Progress Chart',    icon: <BarChart2 size={18} /> },
    { id: 'badges',     label: 'Badges 🏆',         icon: <Award size={18} /> },
    { id: 'notes',      label: 'Notes & Goals',     icon: <BookOpen size={18} /> },
  ];

  const handleCheckIn = () => {
    const today = new Date();
    const todayStr = today.toDateString();

    // Already checked in today — do nothing
    if (lastCheckIn === todayStr) return;

    if (lastCheckIn) {
      const last = new Date(lastCheckIn);
      const diffMs = today.setHours(0,0,0,0) - last.setHours(0,0,0,0);
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Shalay (yesterday) — streak continues ✅
        setStreak(prev => prev + 1);
      } else {
        // >1 day gap — reset streak to 1 🔄
        setStreak(1);
      }
    } else {
      // First ever check-in
      setStreak(1);
    }

    setLastCheckIn(new Date().toDateString());
  };

  return (
    <div className="app-container">
      {/* Desktop sidebar (hidden on mobile via CSS) */}
      <aside className="sidebar">
        <div className="sidebar-logo">🌿 Lavender Fit</div>
        <nav>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom navigation bar (hidden on desktop via CSS) */}
      <nav className="mobile-nav" aria-label="Primary">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.icon}
            <span className="nav-label">{SHORT_LABELS[tab.id] || tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="main-content glass-panel">
        <header className="header-top">
          <h1 className="header-title">
            {window.innerWidth <= 768
              ? (SHORT_LABELS[activeTab] || tabs.find(t => t.id === activeTab)?.label)
              : tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="streak-badge" aria-label={`Current streak: ${streak} days`}>
            🔥 {streak} Day Streak
          </div>
        </header>

        {/* key prop forces re-mount → triggers content-area animation on tab switch */}
        <div className="content-area" key={activeTab}>
          {activeTab === 'dashboard' && (
            <Dashboard metrics={metrics} onCheckIn={handleCheckIn} lastCheckIn={lastCheckIn} />
          )}
          {activeTab === 'challenge' && <ThirtyDayChallenge />}
          {activeTab === 'meals'     && <MealPlan />}
          {activeTab === 'tracker'   && <WorkoutTracker />}
          {activeTab === 'progress'  && <ProgressChart metrics={metrics} setMetrics={setMetrics} />}
          {activeTab === 'badges'    && <Badges streak={streak} />}
          {activeTab === 'notes'     && <NotesAndGoals />}
        </div>
      </main>
    </div>
  );
}

export default App;
