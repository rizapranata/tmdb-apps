interface SliderDotsProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export default function SliderDots({
  count,
  activeIndex,
  onDotClick,
}: SliderDotsProps) {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 mt-2">
      {Array.from({ length: Math.min(count, 7) }).map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-all ${
            activeIndex === index ? "bg-red-500 w-8" : "bg-gray-500"
          }`}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  );
}
