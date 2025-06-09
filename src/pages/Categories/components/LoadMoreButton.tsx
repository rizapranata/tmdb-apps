import CircularProgress from "../../../components/CircularProgressbar";

interface LoadMoreButtonProps {
  loading: boolean;
  show: boolean;
  onClick: () => void;
}

export default function LoadMoreButton({
  loading,
  show,
  onClick,
}: LoadMoreButtonProps) {
  if (loading) return <CircularProgress />;
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="mt-4 text-sm px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
    >
      Load More
    </button>
  );
}
