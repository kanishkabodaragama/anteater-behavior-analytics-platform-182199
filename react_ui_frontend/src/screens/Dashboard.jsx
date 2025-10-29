import React from 'react';
import { api } from '../api/client';
import { useAppDispatch, useAppState, AppActions } from '../state/AppContext';

export default function Dashboard() {
  const { stats } = useAppState();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    api.getStats()
      .then(data => dispatch({ type: AppActions.UPDATE_STATS, payload: data }))
      .catch(() => {});
  }, [dispatch]);

  return (
    <div className="grid grid-3">
      <StatCard title="Total Videos" value={stats.totalVideos} color="var(--color-primary)" />
      <StatCard title="Processed" value={stats.processed} color="var(--color-success)" />
      <StatCard title="Pending" value={stats.pending} color="var(--color-secondary)" />
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-title">Recent Activity</div>
        <p className="muted">Upload videos to start behavior analysis. Recent analysis results will appear here.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
    </div>
  );
}
