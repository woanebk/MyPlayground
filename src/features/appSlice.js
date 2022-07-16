import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: null,
  channelName: null,
  imageURL: null,
  isLoading: true
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
      state.imageURL = action.payload.imageURL;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
});

export const { setChannelId, setChannel, setIsLoading } = appSlice.actions;
export const selectChannelId = (state) => state.app.channelId;
export const selectChannel = (state) => state.app;
export const selectIsLoading = (state) => state.app.isLoading;

export default appSlice.reducer;
