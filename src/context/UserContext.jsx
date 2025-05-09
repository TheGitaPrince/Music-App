import React,{createContext,useRef,useState,useEffect} from 'react'
import { songsData } from "../songs.js";

export const dataContext = createContext()

function UserContext({children}) {
    const audioRef = useRef(new Audio())
    const [index,setIndex] = useState(0)
    const [playingSong,setPlayingSong] = useState(false)


    useEffect(() => {
        audioRef.current.src = songsData[index].song;
        audioRef.current.load();
        if (playingSong) {
            audioRef.current.play();
        }
    }, [index])
    
    const playAudio = () => {
        setPlayingSong(true)
        audioRef.current.play();
    };

    const pauseAudio = () => {
        setPlayingSong(false)
        audioRef.current.pause();
    };

    const togglePlay = ()=>{
        if(playingSong){
            pauseAudio()
        }else{
            playAudio()
        }
    }
    const nextSong = () => {
        setIndex((prev)=>(prev + 1) % songsData.length);
        setPlayingSong(true);
    };
    
    const prevSong = () => {
        setIndex((prev)=>(prev - 1 + songsData.length) % songsData.length);
        setPlayingSong(true);
    };

    useEffect(() => {
        const handleSongEnd = () => {
          //setPlayingSong(false); 
          nextSong();
        };
    
        audioRef.current.addEventListener("ended", handleSongEnd);
    
        return () => {
          audioRef.current.removeEventListener("ended", handleSongEnd);
        };
    }, [nextSong]);

    const value = {
        audioRef,
        togglePlay,
        nextSong,
        prevSong,
        playingSong,
        setPlayingSong,
        songsData,
        index,
        setIndex
   }
   
  return (
    <div>
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext