import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../../constant";
import { MoviesItem } from "../../../models/moviesModel";
import { Star } from "lucide-react";

export default function MovieSlide({ movie }: { movie: MoviesItem }) {
  const year = movie.release_date?.toString().split("-")[0] ?? "N/A";

  return (
    <Link
      key={movie.id}
      to={`/movie/${movie.id}`}
      className="snap-center flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/3 py-2 lg:pr-9 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="flex items-center w-62 px-4 md:px-2">
        <div className="md:w-60 lg:w-72 lg:h-80 xl:w-72 xl:h-80 2xl:w-80 2xl:h-96">
          <img
            src={IMAGE_BASE_URL + movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg lg:rounded-none"
          />
        </div>

        <div className="hidden lg:block bg-slate-950 p-5 w-60 md:w-60 lg:w-80 lg:h-72 overflow-x-hidden scrollbar-hide">
          <div className="flex items-center gap-2">
            <Star size={20} className="text-orange-400" />
            <span className="text-orange-400 font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <h3 className="font-semibold mt-2 text-white">{movie.title}</h3>
          <p className="text-white font-bold">Release - {year}</p>
          <p className="text-sm lg:text-sm text-white text-pretty">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
