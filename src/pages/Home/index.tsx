import { lazy, Suspense, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies, fetchPopularMovies } from "../../api/movies";
import { AppDispatch, RootState } from "../../store";
import Layout from "../../components/Layout";
import {
  nextPage,
} from "../../features/movie/popularSlice";
import SliderSkeleton from "../../components/Skeletons/SliderSkeleton";
import PopularSkeleton from "../../components/Skeletons/PopularSkeleton";

const Slider = lazy(() => import("./components/Slider"));
const Popular = lazy(() => import("./components/Popular"));

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.nowPlaying,
    shallowEqual
  );
  const { popular, page, filteredPopular, status, total_pages } = useSelector(
    (state: RootState) => state.popular,
    shallowEqual
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <Layout>
      {loading && status === "loading" ? (
        <>
          <SliderSkeleton />
          <PopularSkeleton />
        </>
      ) : (
        <Suspense fallback={<><SliderSkeleton /><PopularSkeleton /></>}>
          <Slider movies={movies} />
          <Popular
            data={{ status, popular, filteredPopular }}
            nextPage={handleNextPage}
          />
        </Suspense>
      )}
    </Layout>
  );
}

