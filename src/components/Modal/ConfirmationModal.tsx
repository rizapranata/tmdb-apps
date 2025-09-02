import React from "react";

type ConfirmationModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title = "Confirmation",
  message = "Are you sure?",
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-600 rounded-xl text-center shadow-lg w-96 p-6">
        <p className="">🍟</p>
        <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-1 rounded-md border border-gray-300 text-white hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
