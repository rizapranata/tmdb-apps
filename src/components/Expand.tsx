import { useState } from "react";

interface ExpandProps {
  title: string;
  children: React.ReactNode;
}

const Expand = ({ title, children }: ExpandProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        className="w-full rounded-sm text-left px-4 py-1 bg-slate-500 hover:bg-gray-400 font-semibold flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="px-4 py-2 bg-slate-500 rounded-bl-sm rounded-br-sm">{children}</div>}
    </div>
  );
};

export default Expand;