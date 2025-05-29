import React, { memo } from "react";
import { MoviesItem } from "../../models/moviesModel";
import CircularProgress from "../CircularProgressbar";
import { MovieCard } from "./MovieCard";

interface PopularProps {
  nextPage: () => void;
  data: {
    status: string;
    popular: MoviesItem[];
  };
}

function Popular({ data, nextPage }: PopularProps) {
  const isLoading = data.status === "loading";

  return (
    <section className="bg-secondary">
      <div className="lg:container px-4 py-5">
        <header className="lg:flex lg:items-center lg:justify-between mb-6">
          <div>
            <div className="h-1 w-16 bg-red-400" />
            <h2 className="text-base md:text-xl font-bold mb-4 text-white">
              Discover Movie
            </h2>
          </div>
          <div className="hidden lg:flex gap-4 text-sm">
            <span className="bg-red-400 text-white px-2 py-1 rounded-full">
              Popularity
            </span>
            <span className="bg-primary text-white px-2 py-1 rounded-full">
              Release Date
            </span>
          </div>
        </header>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center m-6">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <button
              onClick={nextPage}
              className="mt-4 text-sm px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(Popular);
