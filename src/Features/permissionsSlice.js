import { createSlice } from '@reduxjs/toolkit';

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: ['Read', 'Write', 'Delete'],
  reducers: {
    addPermission: (state, action) => {
      state.push(action.payload);
    },
    removePermission: (state, action) => {
      return state.filter((permission) => permission !== action.payload);
    },
  },
});

export const { addPermission, removePermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;
