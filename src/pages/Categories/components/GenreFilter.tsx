import { Genre } from "../../../models/movieGenreModel";

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: Genre[];
  onChange: (genre: Genre) => void;
  className?: string;
}

export default function GenreFilter({
  genres,
  selectedGenres,
  onChange,
  className,
}: GenreFilterProps) {
  return (
    <div className={className}>
      {genres?.map((genre) => (
        <label
          key={genre.id}
          className="flex items-center flex-row-reverse lg:justify-between md:justify-items-end lg:mb-2 ml-2 lg:gap-7 gap-1"
        >
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-red-300 rounded-md border-gray-300 bg-gray-400"
            checked={selectedGenres.some((g) => g.id === genre.id)}
            onChange={() => onChange(genre)}
          />
          <span className="text-gray-400 text-sm">{genre.name}</span>
        </label>
      ))}
    </div>
  );
}
