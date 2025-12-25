import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  preloadedState: preloadedState ? { notes: preloadedState } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().notes);
});
