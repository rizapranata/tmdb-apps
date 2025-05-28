import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies, fetchPopularMovies } from "../../api/movies";
import { AppDispatch, RootState } from "../../store";
import Layout from "../../components/Layout";
import Slider from "../../components/Home/Slider";
import Popular from "../../components/Home/Popular";
import { nextPage } from "../../features/movie/popularSlice";
import CircularProgress from "../../components/CircularProgressbar";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.nowPlaying
  );
  const { popular, page, status, total_pages } = useSelector(
    (state: RootState) => state.popular
  );
  useEffect(() => {
    dispatch(fetchNowPlayingMovies(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page < total_pages) {
      dispatch(nextPage());
    }
  };

  if (loading)
    return (
      <div className="flex bg-secondary justify-center items-center min-h-screen bg-salmon-100">
        <CircularProgress />
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
        <Popular status={status} nextPage={handleNextPage} popular={popular} />
      </Layout>
    </>
  );
}
