import { useState } from "react";
import movieIcon from "../../assets/images/movie-icon.png";
import { Film, Search, Video } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="header">
      <nav className="fixed top-0 w-full left-0 bg-slate-800 z-50">
        <div className="container mx-auto px-8 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex justify-center items-center">
              <a
                href="/"
                className="w-20 h-20 lg:w-24 flex items-center justify-center mr-20"
              >
                <img src={movieIcon} alt="movie-icon" />
              </a>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Film size={25} color="grey" />
                  <span className="hidden lg:flex text-gray-400">
                    Find Movie
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-1 bg-slate-500 lg:w-56 xl:w-96 text-cyan-50 active:border-none rounded-md"
                />
                <div className="cursor-pointer">
                  <Search size={20} color="white" />
                </div>
              </div>
            </div>
            {/* Desktop Menu - Mobile First*/}
            <div className="hidden md:flex md:text-sm lg:flex lg:text-sm space-x-6 text-white">
              <div className="flex justify-between gap-1">
                <Video size={20} color="white" className="hidden lg:flex" />
                <a href="/">CATEGORIES</a>
              </div>
              <a href="/">MOVIES</a>
              <a href="/">TV SHOWS</a>
            </div>
            {/* Button Mobile */}
            <div className="md:hidden text-white text-xl">
              <button onClick={() => setIsOpen(!isOpen)}>☰</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-700">
            <div className="flex flex-col space-y-4 p-4 text-white text-center text-sm">
              <a href="/" onClick={() => setIsOpen(!isOpen)}>
                CATEGORIES
              </a>
              <a href="/top-rated" onClick={() => setIsOpen(!isOpen)}>
                MOVIES
              </a>
              <a href="/upcoming" onClick={() => setIsOpen(!isOpen)}>
                TV SHOWS
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-red-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
