import { SortOptions } from "../../../constant";

// components/SortSelector.tsx
interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SortSelector({
  value,
  onChange,
  className,
}: SortSelectorProps) {
  return (
    <select
      className={`px-2 py-2 bg-gray-700 text-white rounded ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={SortOptions.POPULARITY_ASC}>Popularity Ascending</option>
      <option value={SortOptions.POPULARITY_DESC}>Popularity Descending</option>
      <option value={SortOptions.RELEASE_ASC}>Release Date Ascending</option>
      <option value={SortOptions.RELEASE_DESC}>Release Date Descending</option>
      <option value={SortOptions.RATING_ASC}>Rating Ascending</option>
      <option value={SortOptions.RATING_DESC}>Rating Descending</option>
    </select>
  );
}
