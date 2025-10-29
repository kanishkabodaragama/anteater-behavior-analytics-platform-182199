import React from 'react';
import { api } from '../api/client';
import { useAppDispatch, useAppState, AppActions } from '../state/AppContext';

export default function Videos() {
  const { videos } = useAppState();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (videos.length === 0) {
      api.listVideos()
        .then(data => dispatch({ type: AppActions.SET_VIDEOS, payload: data }))
        .catch(() => {});
    }
  }, [dispatch, videos.length]);

  return (
    <div className="card">
      <div className="card-title">Videos</div>
      <div className="grid" style={{ gap: 8 }}>
        {videos.map(v => (
          <div key={v.id} className="card" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontWeight: 700 }}>{v.name}</div>
            <div className="muted" style={{ fontSize: 13, color: 'var(--muted)' }}>Status: {v.status}</div>
          </div>
        ))}
        {videos.length === 0 && <div className="muted">No videos yet. Upload to see them here.</div>}
      </div>
    </div>
  );
}
