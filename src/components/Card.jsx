import React, { useContext } from "react";
import { dataContext } from "../context/UserContext.jsx";
import { MdPlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addSong, removeSong } from "../store/playlistSlice.js";
import {addLike, removeLike} from "../store/likeSlice.js";

function Card({ name, image, singer, songIndex }) {
  const { togglePlay, setIndex } = useContext(dataContext);

  const dispatch = useDispatch();

  const playlistSongs = useSelector((state) => state.playlist);
  const likedSongs = useSelector((state)=>state.like);

  const isInPlaylist = playlistSongs.some((song) => song.songIndex === songIndex);
  const isLiked = likedSongs.some((song)=>song.songIndex === songIndex);

  const handleAddSong = () => {
    if (!isInPlaylist) {
      dispatch(addSong({ name, image, singer, songIndex }));
    }
  };

  const handleRemoveSong = () => {
    dispatch(removeSong(songIndex));
  };

  const handleAddLike = () => {
    if (!isLiked) {
      dispatch(addLike({ name, image, singer, songIndex }));
    }
  };

  const handleRemoveLike = () => {
    dispatch(removeLike(songIndex));
  };

  return (
    <div className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <div
        onClick={() => {
          togglePlay();
          setIndex(songIndex);
        }}
        className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
      >
        <img
          className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
          src={image}
          alt={name}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white/90 truncate">{name}</p>
          <p className="text-sm text-white/60 truncate">{singer}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4">
        {isInPlaylist ? (
          <button
            onClick={handleRemoveSong}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <MdOutlinePlaylistRemove className="text-2xl" />
          </button>
        ) : (
          <button
            onClick={handleAddSong}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <MdPlaylistAdd className="text-2xl" />
          </button>
        )}
         {isLiked ? (
          <button onClick={handleRemoveLike} className="text-white/60 hover:text-white transition-colors cursor-pointer">
            <IoHeartSharp className="text-2xl text-white/85" />
          </button>
        ) : (
          <button onClick={handleAddLike} className="text-white/60 hover:text-white transition-colors cursor-pointer">
            <IoHeartOutline className="text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
