import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './Features/UserSlice';
import rolesReducer from './Features/rolesSlice';
import permissionsReducer from './Features/permissionsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
  },
});

export default store;
