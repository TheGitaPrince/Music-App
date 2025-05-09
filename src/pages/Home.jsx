import React, { useContext, useState, useEffect } from "react";
import { MdSkipPrevious } from "react-icons/md";
import { CgPlayTrackNext } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { dataContext } from "../context/UserContext.jsx";
import Card from "../components/Card.jsx";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import Musicplayer from "../components/Musicplayer.jsx";

function Home() {
  const {
    audioRef,
    songsData,
    playingSong,
    setPlayingSong,
    togglePlay,
    prevSong,
    nextSong,
    index,
  } = useContext(dataContext);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [arrow, setArrow] = useState(false);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const updateProgress = () => {
      if (!audioRef.current) return;
      const duration = audioRef.current.duration || 0;
      const currentTime = audioRef.current.currentTime || 0;
      setCurrentTime(currentTime);
      setDuration(duration);
      setProgress((currentTime / duration) * 100 || 0);
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audioRef]);

  const changeRange = (e) => {
    const newRange = e.target.value;
    const newTime = (newRange / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(newRange);
  };

  const arrowChange = () => {
    setArrow((prev) => !prev);
  };
 

  return (
    <div className="relative max-w-full h-full flex flex-row items-center justify-center bg-black text-white">
      {arrow && (
        <div className="absolute top-0 left-0 w-[99%] h-full pb-40 scroll-smooth bg-black bg-opacity-80 flex flex-col overflow-auto no-scrollbar gap-3 pt-10 md:hidden z-20">
          {songsData.map((song) => (
            <Card
              key={song.id}
              name={song.name}
              singer={song.singer}
              image={song.image}
              songIndex={song.id - 1}
            />
          ))}
        <div className="fixed bottom-16 w-full md:hidden">
          <Musicplayer/>
        </div>
        </div>
      )}
      <div className="w-full md:w-1/2 h-screen flex md:items-center flex-col justify-start items-center md:pt-5 gap-5">
        <div className="md:hidden z-50 w-[100%] relative">
          <div className="absolute left-3 top-3">
            {!arrow ? (
              <RiArrowDownSLine
                onClick={arrowChange}
                className="size-6 cursor-pointer"
              />
            ) : (
              <MdKeyboardArrowRight
                onClick={arrowChange}
                className="size-6 cursor-pointer"
              />
            )}
          </div>
        </div>

        <p className="text-lg text-white/70 font-semibold mx-auto">Now Playing</p>

        <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-xl overflow-hidden shadow-lg border-2 border-white/25">
          <img
            src={songsData[index].image}
            alt="Now Playing"
            className="w-full h-full object-cover"
          />
          {playingSong && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black opacity-40">
                <img
                  className="w-[60%] animate-pulse"
                  src="./musicanim.webp"
                  alt="Music Animation"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center">
           <p className="font-semibold text-white/90 truncate">{songsData[index].name}</p>
           <p className="text-sm text-white/60 truncate">{songsData[index].singer}</p>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-1">
          <div className="w-[70%] relative h-1.5 bg-white/20 rounded-lg overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
            <input
              type="range"
              value={progress}
              onChange={changeRange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between w-[70%] text-sm text-white/40">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <MdSkipPrevious
            onClick={prevSong}
            className="size-7 hover:text-white/60 cursor-pointer transition-all duration-200"
          />
          <div
            onClick={togglePlay}
            className="bg-white text-black hover:bg-white/60 transition-all duration-200 cursor-pointer rounded-full w-12 h-12 flex items-center justify-center"
          >
            {playingSong ? (
              <IoMdPause className="size-4" />
            ) : (
              <FaPlay className="size-4" />
            )}
          </div>
          <CgPlayTrackNext
            onClick={nextSong}
            className="size-7 hover:text-white/60 cursor-pointer transition-all duration-200"
          />
        </div>
      </div>
      <div className="w-[45%] h-screen hidden mr-1 md:flex flex-col overflow-auto no-scrollbar gap-3 pt-5 pb-20">
        {songsData.map((song) => (
          <Card
            key={song.id}
            name={song.name}
            singer={song.singer}
            image={song.image}
            songIndex={song.id - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
