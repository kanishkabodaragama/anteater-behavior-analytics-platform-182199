import React, { createContext, useContext, useReducer, useMemo } from 'react';

/**
 * App state shape:
 * {
 *   theme: 'light' | 'dark',
 *   notifications: number,
 *   videos: Array<{ id: string, name: string, status: 'processing' | 'ready' | 'failed' }>,
 *   stats: { totalVideos: number, processed: number, pending: number }
 * }
 */
const initialState = {
  theme: 'light',
  notifications: 0,
  videos: [],
  stats: { totalVideos: 0, processed: 0, pending: 0 },
};

// Actions
const ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  SET_VIDEOS: 'SET_VIDEOS',
  ADD_VIDEO: 'ADD_VIDEO',
  UPDATE_STATS: 'UPDATE_STATS',
  INCR_NOTIFS: 'INCR_NOTIFS',
  CLEAR_NOTIFS: 'CLEAR_NOTIFS',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    case ACTIONS.SET_VIDEOS:
      return { ...state, videos: action.payload };
    case ACTIONS.ADD_VIDEO:
      return { ...state, videos: [action.payload, ...state.videos] };
    case ACTIONS.UPDATE_STATS:
      return { ...state, stats: { ...state.stats, ...action.payload } };
    case ACTIONS.INCR_NOTIFS:
      return { ...state, notifications: state.notifications + 1 };
    case ACTIONS.CLEAR_NOTIFS:
      return { ...state, notifications: 0 };
    default:
      return state;
  }
}

const AppStateContext = createContext(undefined);
const AppDispatchContext = createContext(undefined);

// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // sync theme to document attribute
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const value = useMemo(() => state, [state]);
  return (
    <AppStateContext.Provider value={value}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (ctx === undefined) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useAppDispatch() {
  const ctx = useContext(AppDispatchContext);
  if (ctx === undefined) throw new Error('useAppDispatch must be used within AppProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export const AppActions = ACTIONS;
