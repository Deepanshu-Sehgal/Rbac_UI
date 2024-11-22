import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push({ ...action.payload, status: 'Active' });
    },
    editUser: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
    toggleStatus: (state, action) => {
      const user = state.find((u) => u.id === action.payload);
      if (user) {
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
      }
    },
  },
});

export const { addUser, editUser, deleteUser, toggleStatus } = UserSlice.actions;
export default UserSlice.reducer;
