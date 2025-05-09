import { configureStore } from "@reduxjs/toolkit";
import  playlistSlice from "./playlistSlice";
import likeSlice  from "./likeSlice";

const store = configureStore({
    reducer:{
        playlist: playlistSlice,
        like: likeSlice
    }
})

export default store