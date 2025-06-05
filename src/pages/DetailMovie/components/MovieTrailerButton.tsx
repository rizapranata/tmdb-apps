import React, { useState } from "react";
import VideoModal from "./VideoModal";

interface MovieTrailerButtonProps {
  trailerKey: string;
}

export default function MovieTrailerButton({ trailerKey }: MovieTrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
      >
        ▶️ Play Trailer
      </button>

      <VideoModal videoKey={trailerKey} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
