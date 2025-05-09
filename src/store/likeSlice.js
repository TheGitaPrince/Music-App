import { createSlice } from "@reduxjs/toolkit";


const likeSlice = createSlice({
    name: "like",
    initialState: [],
    reducers:{
        addLike:(state, action)=>{
         const exists = state.find((song)=>song.songIndex === action.payload.songIndex);
         if(exists){
            return
         }else{
            state.push(action.payload)
         }
        },
        removeLike:(state, action)=>{
          return state.filter((song)=> song.songIndex !== action.payload)
        }
    }
})

export const {addLike, removeLike} = likeSlice.actions;
export default likeSlice.reducer;