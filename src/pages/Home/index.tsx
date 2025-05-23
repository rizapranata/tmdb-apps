import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies } from "../../api/movies";
import { AppDispatch, RootState } from "../../store";
import Layout from "../../components/Layout";

export default function Home() {
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.nowPlaying
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNowPlayingMovies(1));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Layout>
        <div className="bg-salmon-100 min-h-screen items-center justify-center">
          <h1>Welcome to the Home Page</h1>
          <p>This is the main page of our application.</p>
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <h2>{movie.title}</h2>
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies available.</p>
          )}
        </div>
      </Layout>
    </>
  );
}
