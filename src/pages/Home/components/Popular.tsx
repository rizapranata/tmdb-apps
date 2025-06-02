import React, { memo, useMemo, useState } from "react";
import { MoviesItem } from "../../../models/moviesModel";
import { MovieCard } from "./MovieCard";
import DataEmpty from "../../../components/DataEmpty";
import { useDispatch } from "react-redux";
import { setActiveTabAction } from "../../../features/movie/popularSlice";

interface PopularProps {
  nextPage: () => void;
  data: {
    status: string;
    popular: MoviesItem[];
    filteredPopular: MoviesItem[];
  };
}

function Popular({ data, nextPage }: PopularProps) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTabState] = useState<"popularity" | "releaseDate">(
    "popularity"
  );

  const handleTabChange = (tab: "popularity" | "releaseDate") => {
    dispatch(setActiveTabAction(tab));
    setActiveTabState(tab);
  };

  const filteredMovies = useMemo(() => {
    return activeTab === "popularity" ? data.popular : data.filteredPopular;
  }, [activeTab, data.popular, data.filteredPopular]);

  return (
    <section className="bg-secondary">
      <div className="lg:container px-4 py-5">
        <header className="flex items-center justify-between mb-6">
          <div>
            <div className="h-1 w-16 bg-red-400" />
            <h2 className="text-base md:text-xl font-bold mb-4 text-white">
              Discover Movie
            </h2>
          </div>
          <div className="text-sm cursor-pointer">
            {["popularity", "releaseDate"].map((tab) => (
              <span
                key={tab}
                onClick={() =>
                  handleTabChange(tab as "popularity" | "releaseDate")
                }
                className={`${
                  activeTab === tab
                    ? "bg-red-400 hover:bg-red-600"
                    : "bg-primary hover:bg-secondary"
                }  text-white px-2 py-1 rounded-full sm:text-sm mr-1`}
              >
                {tab === "popularity" ? "Popularity" : "Release Date"}
              </span>
            ))}
          </div>
        </header>

        {filteredMovies.length > 0 ? (
          <>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* <div className="flex justify-center m-6">
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
            </div> */}
          </>
        ) : (
          <DataEmpty />
        )}
      </div>
    </section>
  );
}

export default memo(Popular);
