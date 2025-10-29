/**
 * PUBLIC_INTERFACE
 * API client with mock fallback. Reads base URL from REACT_APP_API_BASE_URL.
 */
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/** Internal helper to call backend if BASE_URL is set, otherwise mock */
async function call(endpoint, { method = 'GET', body, headers } = {}) {
  if (!BASE_URL) {
    return mockCall(endpoint, { method, body, headers });
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`API ${res.status}: ${msg}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export const api = {
  // PUBLIC_INTERFACE
  async getStats() {
    return call('/stats');
  },
  // PUBLIC_INTERFACE
  async listVideos() {
    return call('/videos');
  },
  // PUBLIC_INTERFACE
  async uploadVideo({ name }) {
    return call('/videos', { method: 'POST', body: { name } });
  },
};

/** Mock implementation */
async function mockCall(endpoint, { method = 'GET', body } = {}) {
  await delay(250);
  if (endpoint === '/stats' && method === 'GET') {
    return {
      totalVideos: 12,
      processed: 9,
      pending: 3,
    };
  }
  if (endpoint === '/videos' && method === 'GET') {
    return [
      { id: 'v_001', name: 'FieldCam_01.mp4', status: 'ready' },
      { id: 'v_002', name: 'ForestTrail_02.mp4', status: 'processing' },
      { id: 'v_003', name: 'StationA_03.mp4', status: 'ready' },
    ];
  }
  if (endpoint === '/videos' && method === 'POST') {
    return { id: `v_${Math.random().toString(36).slice(2, 7)}`, name: body?.name ?? 'upload', status: 'processing' };
  }
  throw new Error('Mock endpoint not implemented');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
