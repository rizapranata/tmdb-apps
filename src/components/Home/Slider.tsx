import { useEffect, useRef, useState } from "react";
import { IMAGE_BASE_URL } from "../../constant";
import { MoviesItem } from "../../models/moviesModel";
import { Star } from "lucide-react";

interface SliderProps {
  movies: MoviesItem[];
}

function Slider({ movies }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const container = containerRef.current;

      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const isEndReached = scrollLeft + clientWidth >= scrollWidth - 1;

        if (isEndReached) {
          //reset ke awal
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          //geser ke kanan
          container.scrollBy({
            left: 300, // geser satu layar penuh
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDetail = (movieId: number) => {
    console.info(`Show details for movie ID: ${movieId}`);
  };

  return (
    <div className="bg-primary relative w-full mx-auto py-8">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto space-x p-4 scrollbar-hide snap-x scrooll-smooth"
      >
        {movies.map((movie) => {
          const year = movie.release_date.toString().split("-")[0];
          return (
            <div
              key={movie.id}
              onClick={() => handleDetail(movie.id)}
              className="snap-center flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/3 py-2 lg:pr-9"
            >
              {/* //lg:bg-yellow-200 md:bg-gray-400 xl:bg-red-400 */}
              <div className="flex justify-between items-center w-62 px-4 md:px-2 ">
                <div className="md:w-60 lg:w-72 lg:h-96">
                  <img
                    src={IMAGE_BASE_URL + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-lg lg:rounded-none"
                  />
                </div>

                <div className="hidden lg:block bg-slate-950 p-5 w-60 md:w-60 lg:w-72 lg:h-72 overflow-x-hidden">
                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-orange-400" />
                    <span className="text-orange-400 font-semibold">
                      {Number(movie.vote_average).toFixed(1)}
                    </span>
                  </div>
                  <h3 className="font-semibold mt-2 text-white">
                    {movie.title}
                  </h3>
                  <p className="text-white font-bold">Release - {year}</p>
                  <p className="text-sm text-white text-pretty">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Dots Navigation */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.slice(0, 7).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === index ? "bg-red-500 w-8" : "bg-gray-500"
            }`}
            onClick={() => {
              const scrollContainer =
                document.querySelector(".overflow-x-auto");
              if (scrollContainer) {
                scrollContainer.scrollTo({
                  left: index * window.innerWidth,
                  behavior: "smooth",
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
