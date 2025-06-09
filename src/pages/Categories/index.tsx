import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { AppDispatch, RootState } from "../../store";
import { fetchGenresMovie, fetchPopularMovies } from "../../api/movies";
import CircularProgress from "../../components/CircularProgressbar";
import { MovieCard } from "../Home/components/MovieCard";
import { nextPage } from "../../features/movie/popularSlice";
import { Genre } from "../../models/movieGenreModel";
import Expand from "../../components/Expand";

function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const [sortBy, setSortBy] = useState("popularity-ascending");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const { popular, page, total_pages, genres, loading } = useSelector(
    (state: RootState) => state.popular
  );

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
    dispatch(fetchGenresMovie());
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page < total_pages) {
      dispatch(nextPage());
    }
  };

  const handleGenreChange = (genre: Genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.some((g) => g.id === genre.id)
        ? prevGenres.filter((g) => g.id !== genre.id)
        : [...prevGenres, genre]
    );
  };

  const filteredMovies =
    selectedGenres.length > 0
      ? popular.filter((movie) =>
          movie.genre_ids.some((id) => selectedGenres.some((g) => g.id === id))
        )
      : popular;

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "popularity-ascending":
        return a.popularity - b.popularity;
      case "popularity-descending":
        return b.popularity - a.popularity;
      case "releasedate-ascending":
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      case "releasedate-descending":
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      case "rating-ascending":
        return a.vote_average - b.vote_average;
      case "rating-descending":
        return b.vote_average - a.vote_average;
      default:
        return a.popularity - b.popularity;
    }
  });

  return (
    <Layout>
      <div className="bg-secondary">
        <div className="lg:container h-full px-4 py-4">
          <div className="hidden lg:block bg-red-400 h-1 w-11 lg:mt-14"></div>
          <div className="lg:flex-row justify-between items-center lg:items-start">
            <p className="hidden lg:block text-white lg:text-xl font-semibold lg:pb-5">
              Movies
            </p>
            <div className="flex flex-col md:flex-row lg:hidden md:gap-5 md:items-center">
              <p className="hidden text-white font-sm font-semibold">Sort By</p>
              <Expand title={"Filter by Genre"}>
                <div className="lg:hidden grid grid-cols-3 md:grid-cols-5">
                  {genres?.map((genre) => (
                    <label
                      key={JSON.stringify(genre.id)}
                      className="flex items-center flex-row-reverse justify-between mb-2 ml-2"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-red-300 rounded border-gray-300 bg-gray-400"
                        checked={selectedGenres.some((g) => g.id === genre.id)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      <span className="text-white text-sm">{genre.name}</span>
                    </label>
                  ))}
                </div>
              </Expand>
              <div className="lg:hidden">
                <select
                  className="w-full px-4 md:py-2 py-1 my-3 bg-gray-700 md:w-48 md:text-xs text-white rounded-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity-ascending">
                    Popularity Ascending
                  </option>
                  <option value="popularity-descending">
                    Popularity Descending
                  </option>
                  <option value="releasedate-ascending">
                    Release Date Ascending
                  </option>
                  <option value="releasedate-descending">
                    Release Date Descending
                  </option>
                  <option value="rating-ascending">Rating Ascending</option>
                  <option value="rating-descending">Rating Descending</option>
                </select>
              </div>
            </div>
            <div className="lg:flex lg:flex-row gap-4">
              <div className="hidden lg:flex pt-4">
                <div className="flex flex-col items-center bg-primary rounded-sm md:w-32 lg:w-44 h-[700px]">
                  <h4 className="text-white text-sm font-semibold px-2 pt-2 self-start">
                    Sort Result By
                  </h4>
                  <select
                    className="w-full p-2 my-3 bg-gray-700 md:w-28 lg:w-40 md:text-xs text-white rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popularity-ascending">
                      Popularity Ascending
                    </option>
                    <option value="popularity-descending">
                      Popularity Descending
                    </option>
                    <option value="releasedate-ascending">
                      Release Date Ascending
                    </option>
                    <option value="releasedate-descending">
                      Release Date Descending
                    </option>
                    <option value="rating-ascending">Rating Ascending</option>
                    <option value="rating-descending">Rating Descending</option>
                  </select>
                  <p className="hidden text-white">Genres</p>
                  <div className="pr-5">
                    {genres?.map((genre) => (
                      <label
                        key={JSON.stringify(genre.id)}
                        className="flex items-center flex-row-reverse justify-between mb-2 ml-2"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-red-300 rounded border-gray-300 bg-gray-400"
                          checked={selectedGenres.some(
                            (g) => g.id === genre.id
                          )}
                          onChange={() => handleGenreChange(genre)}
                        />
                        <span className="text-white pr-3">{genre.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-4">
                {sortedMovies.map((movie) => (
                  <MovieCard movie={movie} />
                ))}
              </div>
            </div>
            <div className="flex justify-center mx-auto my-10">
              {loading ? (
                <CircularProgress />
              ) : (
                page < total_pages && (
                  <button
                    onClick={handleNextPage}
                    className="mt-4 text-sm px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    Load More
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
