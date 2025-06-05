import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../constant";
import { Cast, MovieCredit } from "../../../models/movieCreditModel";

interface MovieCreditProps {
  credit: MovieCredit;
  showAll: boolean;
}

function MovieCredits({ credit, showAll }: MovieCreditProps) {
  const [creditData, setCreditData] = useState([...credit?.cast]);

  useEffect(() => {
    if (showAll) {
      setCreditData(credit?.cast);
    } else {
      setCreditData(credit?.cast.slice(0, 8));
    }
  }, [showAll]);

  return (
    <div className="grid grid-cols-4 xl:grid-cols-5 gap-3 py-5">
      {creditData?.map((p) => (
        <div key={p.id} className="justify-items-center text-center">
          {p.profile_path !== null ? (
            <img
              src={IMAGE_BASE_URL + p.profile_path}
              alt="profile"
              className="w-20 h-20 lg:w-32 lg:h-32 xl:h-40 xl:w-40 rounded-full object-cover text-gray-500"
            />
          ) : (
            <div className="w-20 h-20 lg:w-32 lg:h-32 xl:h-40 xl:w-40 bg-gray-400 rounded-full"></div>
          )}
          <p className="text-white text-xs xl:text-base">
            {p.name} - {p.character}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MovieCredits;
