import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreditsMovie,
  fetchDetailMovie,
  fetchReviewsMovie,
  fetchVideosMovie,
} from "../../api/movies";
import { AppDispatch, RootState } from "../../store";
import CircularProgress from "../../components/CircularProgressbar";
import DataEmpty from "../../components/DataEmpty";
import ReviewCard from "./components/ReviewCard";
import Banner from "./components/Banner";
import MovieStats from "./components/MovieStats";
import Overview from "./components/Overview";
import MovieCredits from "./components/MovieCredit";
import MovieTrailerButton from "./components/MovieTrailerButton";

export default function DetailMovie() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [showAllCredit, setShowAllCredit] = useState(false);
  const { movieDetail, loading, movieReviews, movieCredit, movieVideos } =
    useSelector((state: RootState) => state.movieDetail);

  useEffect(() => {
    dispatch(fetchCreditsMovie(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchDetailMovie(Number(id)));
    dispatch(fetchReviewsMovie(Number(id)));
    dispatch(fetchVideosMovie(Number(id)));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <CircularProgress />
      </div>
    );
  }

  console.log("movies:", movieVideos);

  return (
    <Layout isOnDetailPage={true}>
      <div className="bg-white">
        <Banner movieDetail={movieDetail} />
        <MovieStats movieDetail={movieDetail} />
        <Overview overview={movieDetail.overview} />
        <div className="flex justify-center py-10">
          {movieVideos
            .filter((v) => v.site === "YouTube" && v.type === "Trailer")
            .slice(0, 1)
            .map((video) => (
              <MovieTrailerButton key={video.id} trailerKey={video.key} />
            ))}
        </div>
        {/* Reviews Section */}
        <div className="px-6 md:px-5 pb-10 lg:pt-5 lg:px-20 xl:px-44 xl:pt-10 2xl:px-64">
          <h3 className="text-sm font-semibold text-red-500">REVIEWS</h3>
          <div className="gap-5 mt-4 overflow-y-auto lg:flex lg:overflow-x-auto scroll-smooth">
            {movieReviews.length > 0 ? (
              movieReviews.map((review) => (
                <ReviewCard key={review.id} content={review} />
              ))
            ) : (
              <DataEmpty />
            )}
          </div>
        </div>
      </div>
      <div className="bg-secondary">
        <div className="lg:container w-full px-5">
          <p className="text-white font-semibold py-5">CREDITS</p>
          <MovieCredits showAll={showAllCredit} credit={movieCredit} />
          <div className="flex pb-6 justify-center">
            <button
              className="text-red-400 italic"
              onClick={() => setShowAllCredit(!showAllCredit)}
            >
              {showAllCredit ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
