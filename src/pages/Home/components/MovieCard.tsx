import { Star } from "lucide-react";
import { IMAGE_BASE_URL } from "../../../constant";
import { MoviesItem } from "../../../models/moviesModel";

export const MovieCard = ({ movie }: { movie: MoviesItem }) => {
  return (
    <div
      key={movie.id}
      className="rounded-lg shadow bg-opacity-50 cursor-pointer hover:bg-opacity-75 transition"
    >
      <div className="relative overflow-hidden rounded-lg transform transition-transform hover:scale-105">
        <img
          src={IMAGE_BASE_URL + movie.poster_path}
          alt={movie.title}
          className="w-full h-auto rounded"
        />
        <div className="flex absolute top-0 right-0 bg-primary rounded-md items-center">
          <Star className="hidden md:block text-orange-400" size={15} />
          <p className="text-sm font-semibold text-orange-400 p-1">
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
      <h3 className="mt-2 text-sm font-semibold text-white">{movie.title}</h3>
      <p className="text-sm text-white">
        {movie.release_date?.toString().split("-")[0] ?? "N/A"}
      </p>
    </div>
  );
};
