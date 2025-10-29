import React from 'react';
import { useAppDispatch, useAppState, AppActions } from '../state/AppContext';

export default function Settings() {
  const { theme } = useAppState();
  const dispatch = useAppDispatch();

  function toggleTheme() {
    dispatch({ type: AppActions.TOGGLE_THEME });
  }

  return (
    <div className="card">
      <div className="card-title">Settings</div>
      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700 }}>Theme</div>
            <div className="muted" style={{ color: 'var(--muted)', fontSize: 13 }}>Switch application theme</div>
          </div>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            Toggle to {theme === 'light' ? 'dark' : 'light'}
          </button>
        </div>
      </div>
    </div>
  );
}
