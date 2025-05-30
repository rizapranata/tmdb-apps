import { useRef, useState } from "react";
import { MoviesItem } from "../../../models/moviesModel";
import MovieSlide from "./MovieSlide";
import SliderDots from "../components/SliderDots";

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

  // auto scroll functionality
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const container = containerRef.current;
  //     if (container) {
  //       const { scrollLeft, scrollWidth, clientWidth } = container;
  //       const isEndReached = scrollLeft + clientWidth >= scrollWidth - 1;

  //       if (isEndReached) {
  //         container.scrollTo({ left: 0, behavior: "smooth" });
  //       } else {
  //         container.scrollBy({ left: clientWidth, behavior: "smooth" });
  //       }
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-primary relative w-full mx-auto pb-5 lg:py-8">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto space-x p-4 scrollbar-hide snap-x scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieSlide key={movie.id} movie={movie} />
        ))}
      </div>

      <SliderDots
        count={movies.length}
        activeIndex={activeIndex}
        onDotClick={(index) => {
          containerRef.current?.scrollTo({
            left: index * window.innerWidth,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
}

export default Slider;
