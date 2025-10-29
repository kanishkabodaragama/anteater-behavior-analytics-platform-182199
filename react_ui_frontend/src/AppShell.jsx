import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './theme.css';

import { AppProvider } from './state/AppContext';
import Dashboard from './screens/Dashboard';
import Upload from './screens/Upload';
import Videos from './screens/Videos';
import Reports from './screens/Reports';
import Settings from './screens/Settings';

/**
 * PUBLIC_INTERFACE
 * AppShell bootstraps routing, global providers, and the core layout
 */
export default function AppShell() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <aside className="sidebar">
            <div className="nav-title">Viz AI</div>
            <nav className="nav-group">
              <NavItem to="/dashboard" label="Dashboard" />
              <NavItem to="/upload" label="Upload" />
              <NavItem to="/videos" label="Videos" />
              <NavItem to="/reports" label="Reports" />
              <NavItem to="/settings" label="Settings" />
            </nav>
            <div style={{ marginTop: 20 }}>
              <span className="badge">Ocean Professional</span>
            </div>
          </aside>

          <header className="topbar">
            <div style={{ fontWeight: 700 }}>Anteater Behavior Analytics</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="btn btn-ghost">Notifications</button>
              <button className="btn btn-ghost">Account</button>
            </div>
          </header>

          <main className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
    >
      <span>{label}</span>
    </NavLink>
  );
}

function NotFound() {
  return (
    <div className="card">
      <div className="card-title">Not Found</div>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
