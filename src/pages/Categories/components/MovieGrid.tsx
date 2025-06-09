// components/MovieGrid.tsx
import { MoviesItem } from "../../../models/moviesModel";
import { MovieCard } from "../../Home/components/MovieCard";

interface MovieGridProps {
  movies: MoviesItem[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
