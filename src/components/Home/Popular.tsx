import React from "react";
import { MoviesItem } from "../../models/moviesModel";
import { IMAGE_BASE_URL } from "../../constant";
import { Star } from "lucide-react";

interface PopularProps {
  popular: MoviesItem[];
}

function Popular({ popular }: PopularProps) {
  return (
    <div className=" bg-secondary">
      <div className="container py-5">
        <div className="lg:flex lg:items-center lg:justify-between mb-6">
          <div>
            <div className="h-1 w-16 bg-red-400"></div>
            <h2 className="text-base md:text-xl font-bold mb-4 text-white">
              Discover Movie
            </h2>
          </div>
          <div className="hidden lg:flex lg:items-center gap-4">
            <div className="bg-red-400 rounded-full">
              <p className="text-white p-2">Popularity</p>
            </div>
            <div className="bg-primary rounded-full">
              <p className="text-white p-2">Release Date</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popular.map((movie) => (
            <div
              key={movie.id}
              className="rounded-lg shadow transition-opacity bg-opacity-50 cursor-pointer hover:bg-opacity-75"
            >
              <div className="relative overflow-hidden rounded-lg hover:transform hover:scale-105 transition-transform">
                <img
                  src={IMAGE_BASE_URL + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-auto rounded"
                />
                <div className="absolute top-0 right-0 bg-primary rounded-lg">
                  <p className="text-sm font-semibold text-orange-400 p-1">
                    ⭐{Number(movie.vote_average).toFixed(1)}
                  </p>
                </div>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-white">
                {movie.release_date.toString().split("-")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Popular;
