import React, { useState, useEffect, useContext } from "react";
import Musicplayer from "../components/Musicplayer.jsx";
import Card from "../components/Card.jsx";
import { dataContext } from "../context/UserContext.jsx";
import { IoSearch } from "react-icons/io5";

function Search() {
  const { songsData } = useContext(dataContext);
  const [input, setInput] = useState("");
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    const list = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(input) ||
        song.singer.toLowerCase().includes(input)
    );
    setSongList(list);
  }, [input]);

  return (
    <div className="bg-black w-full min-h-screen text-white flex flex-col items-center">
      <div className="w-full flex items-center justify-center flex-col h-full">
        <div className="md:w-[50%] w-[70%] bg-black  fixed top-10 flex flex-row items-center justify-center gap-2 h-9 border-2 border-gray-700 rounded-lg px-1.5">
          <div>
            <IoSearch className="size-5 text-white/70" />
          </div>
          <input
            className="w-full outline-none bg-transparent text-white placeholder-white/50"
            type="text"
            value={input}
            placeholder="Search song.."
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="md:w-[60%] w-full overflow-auto no-scrollbar md:px-0 px-2 pt-23 pb-40 flex flex-col gap-2">
          {input?(songList &&
            songList.map((song) => (
              <Card
                key={song.id}
                name={song.name}
                singer={song.singer}
                image={song.image}
                songIndex={song.id - 1}
              />
            ))):""}
        </div>
      </div>
      <div className="md:w-[50%] w-full fixed bottom-16">
        <Musicplayer />
      </div>
    </div>
  );
}

export default Search;
