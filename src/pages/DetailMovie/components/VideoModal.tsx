import React from "react";

interface VideoModalProps {
  videoKey: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoKey, isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative w-full max-w-3xl mx-auto p-4">
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <button
          className="absolute top-2 right-2 bg-white text-black font-bold px-3 py-1 rounded-full shadow hover:bg-gray-200"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
