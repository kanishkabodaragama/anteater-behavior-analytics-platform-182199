import React from 'react';
import { api } from '../api/client';
import { useAppDispatch, AppActions } from '../state/AppContext';

export default function Upload() {
  const [name, setName] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const dispatch = useAppDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const created = await api.uploadVideo({ name });
      dispatch({ type: AppActions.ADD_VIDEO, payload: created });
      dispatch({ type: AppActions.INCR_NOTIFS });
      setName('');
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card">
      <div className="card-title">Upload Video</div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
          <label>Video name</label>
          <input className="input" placeholder="FieldCam_01.mp4" value={name} onChange={e => setName(e.target.value)} />
          {error && <div style={{ color: 'var(--color-error)', fontSize: 14 }}>{error}</div>}
          <div>
            <button className="btn btn-primary" disabled={submitting || !name}>
              {submitting ? 'Uploading…' : 'Upload'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
