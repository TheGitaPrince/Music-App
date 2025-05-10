import React from "react";
import Musicplayer from "../components/Musicplayer.jsx";
import { useSelector } from "react-redux";
import Card from "../components/Card.jsx";

function Playlist() {
  const songs = useSelector((state) => state.playlist);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center ">
      <div className="md:w-[60%] w-full overflow-auto no-scrollbar md:pt-8 pt-5 pb-40 flex flex-col gap-2">
        {songs.length > 0 ? (
          songs.map((song) => (
            <Card
              key={song.songIndex}
              name={song.name}
              singer={song.singer}
              image={song.image}
              songIndex={song.songIndex}
            />
          ))
        ) : (
          <p className="text-white/60 text-center">No songs in the playlist</p>
        )}
      </div>
      <div className="md:w-[50%] w-full fixed bottom-16">
        <Musicplayer />
      </div>
    </div>
  );
}

export default Playlist;
