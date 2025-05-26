import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies } from "../../api/movies";
import { AppDispatch, RootState } from "../../store";
import Layout from "../../components/Layout";
import Slider from "../../components/Home/Slider";

export default function Home() {
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.nowPlaying
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNowPlayingMovies(1));
  }, [dispatch]);

  if (loading)
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
        {/* Slider section start */}
        <Slider movies={movies} />
        {/* Slider section end */}
      </Layout>
    </>
  );
}
