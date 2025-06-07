import { useState } from "react";
import movieIcon from "../../assets/images/movie-icon.png";
import { Film, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { fetchSearchMovies } from "../../api/movies";

interface HeaderProps {
  isOnDetailPage?: boolean;
}

export default function Header({ isOnDetailPage }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim() !== "") {
        dispatch(fetchSearchMovies(value));
         navigation("/search");
      }
    }, 800),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <header className="header">
      <nav
        className={`${
          isOnDetailPage ? "bg-white/10" : "bg-slate-800"
        }  fixed top-0 w-full left-0 z-50`}
      >
        <div className="lg:container px-4 mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex justify-center items-center">
              <a
                href="/"
                className="w-20 h-20 lg:w-24 flex items-center justify-center md:mr-20"
              >
                <img src={movieIcon} alt="movie-icon" />
              </a>
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-2">
                  <Film size={25} color="grey" />
                  <span className=" text-gray-400">Find Movie</span>
                </div>
                <input
                  type="text"
                  placeholder="Search movie..."
                  onChange={handleSearchChange}
                  // onFocus={() => navigation("/search")}
                  className={`${
                    isOnDetailPage ? "bg-gray-500/50" : "bg-slate-500"
                  } p-1 w-52 md:w-64 lg:w-56 xl:w-96 text-cyan-50 active:border-none rounded-md`}
                />
              </div>
            </div>
            {/* Desktop Menu - Mobile First*/}
            <div className="hidden md:flex md:text-xs lg:flex lg:text-xs xl:text-sm space-x-6 text-white">
              <div className="flex justify-between items-center gap-1">
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
          <div
            className={`md:hidden ${
              isOnDetailPage ? "bg-slate-500/40" : "bg-slate-800"
            }`}
          >
            <div className="flex flex-col space-y-4 p-4 text-white text-center text-xs xl:text-base">
              <a href="/" onClick={() => setIsOpen(!isOpen)}>
                CATEGORIES
              </a>
              <a href="/" onClick={() => setIsOpen(!isOpen)}>
                MOVIES
              </a>
              <a href="/" onClick={() => setIsOpen(!isOpen)}>
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
