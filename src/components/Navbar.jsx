import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { PiPlaylistBold } from "react-icons/pi";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/10">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
        <Link to="/" className="p-3 text-white/60 hover:text-white transition-colors">
          <AiFillHome className="text-2xl" />
        </Link>
        <Link to="/search" className="p-3 text-white/60 hover:text-white transition-colors">
          <FaSearch className="text-xl" />
        </Link>
        <Link to="/playlist" className="p-3 text-white/60 hover:text-white transition-colors">
          <PiPlaylistBold className="text-2xl" />
        </Link>
        <Link to="/like" className="p-3 text-white/60 hover:text-white transition-colors">
          <IoHeart className="text-2xl" />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;