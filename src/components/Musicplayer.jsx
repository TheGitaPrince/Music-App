import React,{useContext} from 'react'
import { dataContext } from "../context/UserContext.jsx";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";

function Musicplayer() {
    const {
        togglePlay,
        playingSong,
        songsData,
        index,
    } = useContext(dataContext);

  return (
    <div className="group flex items-center justify-between p-4 rounded-t-xl bg-white text-black transition-colors">
      <div 
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <img
          className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
          src={songsData[index].image}
          alt={name}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-black/90 truncate">{songsData[index].name}</p>
          <p className="text-sm text-black/70 truncate">{songsData[index].singer}</p>
        </div>
        <div
            onClick={togglePlay}
            className=" bg-black/95 text-white/80 hover:bg-black/90 transition-all duration-200 cursor-pointer rounded-full w-12 h-12 flex items-center justify-center"
          >
            {playingSong ? (
              <IoMdPause className="size-4" />
            ) : (
              <FaPlay className="size-4" />
            )}
          </div>
      </div>  
    </div>
  )
}

export default Musicplayer