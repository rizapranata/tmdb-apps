import React from "react";
import { MoviesItem } from "../../models/moviesModel";
import { IMAGE_BASE_URL } from "../../constant";

interface PopularProps {
  popular: MoviesItem[];
}

function Popular({ popular }: PopularProps) {
  return (
    <div className=" bg-secondary">
      <div className="container py-5">
        <div className="lg:flex lg:items-center lg:justify-between mb-6">
          <h2 className="text-xl font-bold mb-4 text-white">Popular Movies</h2>
          <p className="hidden lg:block text-xl font-bold text-white">
            Popular
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popular.map((movie) => (
            <div key={movie.id} className="rounded-lg shadow">
              <img
                src={IMAGE_BASE_URL + movie.poster_path}
                alt={movie.title}
                className="w-full h-auto rounded"
              />
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
