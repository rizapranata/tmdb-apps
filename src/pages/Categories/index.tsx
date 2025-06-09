import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { AppDispatch, RootState } from "../../store";
import { fetchGenresMovie, fetchPopularMovies } from "../../api/movies";
import { nextPage } from "../../features/movie/popularSlice";
import { Genre } from "../../models/movieGenreModel";
import Expand from "../../components/Expand";
import { SortOptions } from "../../constant";
import GenreFilter from "./components/GenreFilter";
import SortSelector from "./components/SortSelector";
import MovieGrid from "./components/MovieGrid";
import LoadMoreButton from "./components/LoadMoreButton";

export function removeDuplicatesBy<T>(
  array: T[],
  keyFn: (item: T) => any
): T[] {
  return array.filter(
    (item, index, self) =>
      index === self.findIndex((t) => keyFn(t) === keyFn(item))
  );
}

function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const [sortBy, setSortBy] = useState("popularity-ascending");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const { popular, page, total_pages, genres, loading } = useSelector(
    (state: RootState) => state.popular
  );

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchGenresMovie());
  }, [dispatch]);

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

  const filteredMovies = useMemo(() => {
    if (selectedGenres.length === 0) return popular;
    return popular.filter((movie) =>
      movie.genre_ids.some((id) => selectedGenres.some((g) => g.id === id))
    );
  }, [popular, selectedGenres]);

  const sortedMovies = useMemo(() => {
    const uniqueMovies = removeDuplicatesBy(filteredMovies, (m) => m.id);
    return [...uniqueMovies].sort((a, b) => {
      switch (sortBy) {
        case SortOptions.POPULARITY_ASC:
          return a.popularity - b.popularity;
        case SortOptions.POPULARITY_DESC:
          return b.popularity - a.popularity;
        case SortOptions.RELEASE_ASC:
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        case SortOptions.RELEASE_DESC:
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        case SortOptions.RATING_ASC:
          return a.vote_average - b.vote_average;
        case SortOptions.RATING_DESC:
          return b.vote_average - a.vote_average;
        default:
          return 0;
      }
    });
  }, [filteredMovies, sortBy]);

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
              <Expand title="Filter by Genre">
                <GenreFilter
                  genres={genres}
                  selectedGenres={selectedGenres}
                  onChange={handleGenreChange}
                  className="grid grid-cols-3 md:grid-cols-5"
                />
              </Expand>
              <SortSelector
                value={sortBy}
                onChange={setSortBy}
                className="w-full md:w-48 md:text-xs my-3"
              />
            </div>
            <div className="lg:flex lg:flex-row gap-4">
              <div className="hidden lg:flex pt-4">
                <div className="flex flex-col items-center bg-primary rounded-sm md:w-32 lg:w-44 h-[700px]">
                  <h4 className="text-white text-sm font-semibold px-2 pt-2 self-start">
                    Sort Result By
                  </h4>
                  <SortSelector
                    value={sortBy}
                    onChange={setSortBy}
                    className="w-full p-2 my-3 bg-gray-700 md:w-28 lg:w-40 md:text-xs"
                  />
                  <GenreFilter
                    genres={genres}
                    selectedGenres={selectedGenres}
                    onChange={handleGenreChange}
                    className="pr-5"
                  />
                </div>
              </div>
              <MovieGrid movies={sortedMovies} />
            </div>
            <div className="flex justify-center mx-auto my-10">
              <LoadMoreButton
                loading={loading}
                show={page < total_pages}
                onClick={handleNextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
