import React from "react";
import { IoMdClose } from "react-icons/io";

interface IModal {
    openModal: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export default function EditPostModal({ openModal, onClose, children }: IModal) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${openModal ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${openModal ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  )
}