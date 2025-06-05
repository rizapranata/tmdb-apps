import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MovieCard } from "../Home/components/MovieCard";
import CircularProgress from "../../components/CircularProgressbar";

function Search() {
  const { movies, loading } = useSelector(
    (state: RootState) => state.movieSearch
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-secondary">
        <div className="lg:container h-screen overflow-scroll">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-4 px-4 lg:px-0 gap-4">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
