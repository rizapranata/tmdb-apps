import dayjs from "dayjs";
import { IMAGE_BASE_URL } from "../../../constant";
import { MovieDetail } from "../../../models/movieDetailModel";

type Props = {
  movieDetail: MovieDetail;
};

export default function Banner({ movieDetail }: Props) {
  return (
    <div className="relative bg-secondary">
      <img
        src={IMAGE_BASE_URL + movieDetail.backdrop_path}
        alt="Movie Banner"
        className="w-full h-52 md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[500px] object-cover -mt-16"
      />
      <img
        src={IMAGE_BASE_URL + movieDetail.poster_path}
        alt="Movie Poster"
        className="absolute w-32 -bottom-24 left-5 lg:w-48 2xl:w-72 lg:-bottom-40 xl:-bottom-44 lg:left-20 xl:left-44 2xl:left-64"
      />
      <div className="absolute md:text-nowrap lg:text-xl xl:text-2xl text-white bottom-0 left-40 lg:w-48 lg:left-72 xl:left-96 2xl:left-[570px]">
        <p>{dayjs(movieDetail.release_date).format("MMMM D, YYYY")}</p>
        <h2 className="font-semibold">{movieDetail.title}</h2>
        <p className="">{movieDetail.genres?.map((g) => g.name).join(", ")}</p>
      </div>
    </div>
  );
}
