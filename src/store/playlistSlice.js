import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: [],
  reducers: {
    addSong: (state, action) => {
      const exists = state.find((song) => song.songIndex === action.payload.songIndex);
      if (exists) {
        return
      }else{
        state.push(action.payload)
      }
    },
    removeSong: (state, action) => {
      return state.filter((song) => song.songIndex !== action.payload);
    }
  }
});

export const { addSong, removeSong } = playlistSlice.actions;
export default playlistSlice.reducer;
