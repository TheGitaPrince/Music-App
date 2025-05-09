import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/Home.jsx";
import Search  from "./pages/Search.jsx";
import Like  from "./pages/Like.jsx";
import Playlist  from "./pages/Playlist.jsx";
import Navbar  from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route >
           <Route path="/" element={<Home/>}/>
           <Route path="/search" element={<Search/>}/>
           <Route path="/like" element={<Like/>}/>
           <Route path="/playlist" element={<Playlist/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App