import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie, fetchReviewsMovie } from "../../api/movies";
import { AppDispatch, RootState } from "../../store";
import { IMAGE_BASE_URL } from "../../constant";
import CircularProgress from "../../components/CircularProgressbar";
import DataEmpty from "../../components/DataEmpty";
import ReviewCard from "./components/ReviewCard";
import dayjs from "dayjs";

export default function DetailMovie() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movieDetail, loading, movieReviews } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailMovie(Number(id)));
      dispatch(fetchReviewsMovie(Number(id)));
    }
  }, [id, dispatch]);

  console.info("Movie Detail:", movieDetail);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Layout isOnDetailPage={true}>
      <div className="bg-white">
        <div className="relative bg-secondary">
          <img
            src={IMAGE_BASE_URL + movieDetail.backdrop_path}
            alt="Movie Banner"
            className="w-full h-52 md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[500px] object-cover -mt-16"
          />
          <img
            src={IMAGE_BASE_URL + movieDetail.poster_path}
            alt="Movie Poster"
            className="absolute w-32 -bottom-11 left-5 lg:w-48 2xl:w-72 lg:-bottom-28 lg:left-20 xl:left-44 2xl:left-64"
          />
          <div className="absolute 2xl:text-xl text-white bottom-14 left-40 lg:w-64 xl:w-64 2xl:w-96 md:bottom-16 lg:bottom-16 lg:left-72 xl:left-96 2xl:left-[570px]">
            <p>{dayjs(movieDetail.release_date).format('MMMM D, YYYY')}</p>
            <h2 className="font-semibold">{movieDetail.title}</h2>
            <p>{movieDetail.genres?.map((g) => g.name).join(", ")}</p>
          </div>
          <div className="flex items-center uppercase overflow-y-auto justify-start gap-5 md:gap-12 lg:gap-14 xl:gap-20 pl-40 lg:pl-72 xl:pl-96 2xl:pl-[570px] py-2">
            <h1 className="text-xl font-bold text-white lg:text-xl">
              ⭐{Number(movieDetail.vote_average).toFixed(1)}
            </h1>
            <div className="text-white text-sm">
              <p className="hidden md:block text-gray-400">User Score</p>
              <p>{movieDetail.vote_count}</p>
            </div>
            <div className="text-white text-sm">
              <p className="hidden md:block text-gray-400">Status</p>
              <p>{movieDetail.status}</p>
            </div>
            <div className="text-white text-sm">
              <p className="hidden md:block text-gray-400">Language</p>
              <p>{movieDetail.original_language}</p>
            </div>
            <div className="hidden md:block text-white text-sm">
              <p className="text-gray-400">Budget</p>
              <p>{movieDetail.budget}</p>
            </div>
            <div className="hidden text-white text-sm">
              <p className="">Production</p>
              {movieDetail?.production_companies?.length > 0 && (
                <div className="flex">
                  {movieDetail.production_companies.map((ph) => (
                    <p> {ph.name} | </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full pt-10 pl-5 pr-5 lg:pl-72 lg:pt-2 xl:pl-96 xl:pr-80 2xl:pl-[570px] my-5">
          <h2 className="text-sm text-red-500 font-semibold">OVERVIEW</h2>
          <p className="text-xs">{movieDetail.overview}</p>
        </div>
        {/* Reviews Section */}
        <div className="px-6 md:px-5 pb-10 lg:pt-5 lg:px-20 xl:px-44 xl:pt-10 2xl:px-64">
          <h3 className="text-sm font-semibold text-red-500">REVIEWS</h3>
          <div className="gap-5 mt-4 overflow-y-auto lg:px-5 lg:flex lg:overflow-x-auto scroll-smooth">
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
    </Layout>
  );
}
