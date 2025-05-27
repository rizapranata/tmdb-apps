import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies, fetchPopularMovies } from "../../api/movies";
import { AppDispatch, RootState } from "../../store";
import Layout from "../../components/Layout";
import Slider from "../../components/Home/Slider";
import Popular from "../../components/Home/Popular";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.nowPlaying
  );

  const { popular, status } = useSelector((state: RootState) => state.popular);

  useEffect(() => {
    dispatch(fetchNowPlayingMovies(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
  }, [dispatch]);

  if (loading || status === "loading")
    return (
      <div className="flex justify-center items-center min-h-screen bg-salmon-100">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-salmon-100">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <>
      <Layout>
        <Slider movies={movies} />
        <Popular popular={popular} />
      </Layout>
    </>
  );
}
