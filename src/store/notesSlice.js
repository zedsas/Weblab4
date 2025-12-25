import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  nextId: 1,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const { title, description } = action.payload;
      state.items.push({
        id: state.nextId,
        title,
        description,
        isPinned: false,
      });
      state.nextId += 1;
    },
    deleteNote: (state, action) => {
      state.items = state.items.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action) => {
      const { id, title, description } = action.payload;
      const note = state.items.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.description = description;
      }
    },
    togglePin: (state, action) => {
      const note = state.items.find((n) => n.id === action.payload);
      if (note) {
        if (note.isPinned) {
          note.isPinned = false;
        } else {
          const pinnedCount = state.items.filter((n) => n.isPinned).length;
          if (pinnedCount < 3) {
            note.isPinned = true;
          } else {
            alert('Максимум 3 закрепленных задачи!');
          }
        }
      }
    },
    moveNote: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.items.splice(fromIndex, 1);
      state.items.splice(toIndex, 0, movedItem);
    },
    setNotes: (state, action) => {
       state.items = action.payload.items;
       state.nextId = action.payload.nextId;
    }
  },
});

export const { addNote, deleteNote, updateNote, togglePin, moveNote, setNotes } = notesSlice.actions;
export default notesSlice.reducer;
