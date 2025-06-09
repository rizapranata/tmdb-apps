import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { MovieCard } from "../Home/components/MovieCard";
import CircularProgress from "../../components/CircularProgressbar";
import { Video } from "lucide-react";
import { nextPage } from "../../features/movie/movieSearchSlice";
import { fetchSearchMovies } from "../../api/movies";
import { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, page, total_pages, query } = useSelector(
    (state: RootState) => state.movieSearch
  );

  useEffect(() => {
    debouncedSearch(query, page);
  }, [dispatch, query, page]);

  const debouncedSearch = useCallback(
    debounce((value: string, pageNum: number) => {
      if (value.trim() !== "") {
        dispatch(fetchSearchMovies({ query: value, page: pageNum }));
      }
    }, 800),
    []
  );

  const handleNextPage = () => {
    if (page < total_pages) {
      dispatch(nextPage());
    }
  };

  return (
    <Layout>
      <div className="bg-secondary">
        <div className="lg:container h-screen overflow-scroll scrollbar-hide">
          {movies?.length !== 0 ? (
            <>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-4 px-4 lg:px-0 gap-4">
                {movies?.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
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
            </>
          ) : (
            <div className="flex flex-col h-screen justify-center items-center">
              <Video size={40} className="text-gray-300" />
              <h2 className="text-gray-300">Search Movie</h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Search;
