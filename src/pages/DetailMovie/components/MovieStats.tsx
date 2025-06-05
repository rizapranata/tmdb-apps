import { MovieDetail } from "../../../models/movieDetailModel";

type MovieStatsProps = {
  movieDetail: MovieDetail;
};

export default function MovieStats({ movieDetail }: MovieStatsProps) {
  return (
    <div className="flex bg-secondary items-center uppercase md:text-sm overflow-y-auto justify-start gap-5 md:gap-12 lg:gap-14 xl:gap-20 pl-40 lg:pl-72 xl:pl-96 2xl:pl-[570px] py-2">
      <h1 className="text-sm md:text-xl font-bold text-white lg:text-xl">
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
        <p>Production</p>
        {movieDetail?.production_companies?.length > 0 && (
          <div className="flex">
            {movieDetail.production_companies.map((ph: any) => (
              <p key={ph.name}>{ph.name} | </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
