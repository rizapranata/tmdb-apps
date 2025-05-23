import { useState } from "react";
import movieIcon from "../../assets/images/movie-icon.png";
import categoriesIcon from "../../assets/images/categories-icon.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="header">
      <nav className="fixed top-0 w-full left-0 bg-slate-800 z-50">
        <div className="container mx-auto px-8 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">
              <a href="/">
                <img src={movieIcon} alt="movie-icon" width="40%" />
              </a>
            </div>
            {/* Desktop Menu - Mobile First*/}
            <div className="hidden md:flex space-x-6 text-white">
              <div className="flex justify-between">
                <img src={categoriesIcon} alt="categories-icon" width={20} />
                <a href="/">CATEGORIES</a>
              </div>
              <a href="/top-rated">MOVIES</a>
              <a href="/upcoming">TV SHOWS</a>
            </div>
            {/* Button Mobile */}
            <div className="md:hidden text-white">
              <button onClick={() => setIsOpen(!isOpen)}>☰</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-700">
            <div className="flex flex-col space-y-4 p-4 text-white text-center">
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
