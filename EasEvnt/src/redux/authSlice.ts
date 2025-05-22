import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuthState} = authSlice.actions;

export default authSlice.reducer;
