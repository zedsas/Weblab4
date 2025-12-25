
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('notes-app-redux');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Ошибка чтения localStorage:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('notes-app-redux', serializedState);
  } catch (err) {
    console.error("Ошибка записи localStorage:", err);
  }
};
