import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: null,
  channelName: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setChannelId: (state, action) => {
      state.channelId = action.payload;
    },
    setChannel: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelId, setChannel } = appSlice.actions;
export const selectChannelId = (state) => state.app.channelId;
export const selectChannel = (state) => state.app;

export default appSlice.reducer;
