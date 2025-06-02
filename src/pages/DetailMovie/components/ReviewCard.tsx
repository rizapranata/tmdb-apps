import React, { useState } from "react";
import { Review } from "../../../models/movieReviewModel";
import dayjs from "dayjs";

interface ReviewCardProps {
  content: Review;
}

function ReviewCard({ content }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div
      key={content.id}
      className="bg-gray-50 px-4 py-4 mb-5 lg:min-w-[50%] 2xl:min-w-[40%] rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full">
            <p className="text-center pt-1">🙎‍♂️</p>
          </div>
          <div>
            <span className="text-gray-900 font-bold">{content.author}</span>
            <p className="text-gray-900 text-sm mt-1">
              {dayjs(content.created_at).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
        <div className="bg-gray-200 rounded-md p-2">
          <span className="text-gray-900 lg:text-2xl font-bold">
            ⭐{content.author_details.rating}
          </span>
        </div>
      </div>

      {content.content && (
        <div className="mt-2">
          <p
            className={`text-gray-900 text-xs text-balance italic ${
              !isExpanded ? "line-clamp-5" : ""
            }`}
          >
            {content.content}
          </p>

          {/* Tombol Read More / Less */}
          <button
            onClick={toggleExpanded}
            className="mt-2 text-red-400 hover:underline text-xs font-semibold"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
