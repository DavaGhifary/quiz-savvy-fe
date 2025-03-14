import { CodeXml, SendHorizonal, X } from "lucide-react";
import React, { useState } from "react";

const ModalEnterCode = ({ isOpen, closeModal, onSubmit }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (code.length === 6) {
      await onSubmit(code); // Kirim kode ke backend
      closeModal(); // Tutup modal setelah mengirim
    } else {
      alert("Please enter a valid 6-digit code");
    }

    setError("");

    try {
      const response = await fetch(`${apiUrl}/quiz/check-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        onSubmit(data.quiz_id);
        closeModal();
      } else {
        setError("Invalid Code");
      }
    } catch (error) {
      setError("Server error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 pt-10">
      {/* Modal Container */}
      <div className="relative bg-white border-2 border-primary text-secondary p-6 rounded-lg shadow-lg w-96">
        {/* Icon at the top */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-secondary to-primary p-3 rounded-full shadow-md">
          <CodeXml className="text-white" size={30} />
        </div>

        <div
          className="absolute top-2 right-2 flex justify-end cursor-pointer"
          onClick={closeModal}
        >
          <X />
        </div>

        {/* Header */}
        <h2 className="text-xl font-semibold text-center mt-4">Enter Code</h2>

        {/* Input field */}
        <div className="mt-4 flex">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 rounded-l-full border-2 border-secondary bg-white text-secondary text-center focus:outline-none"
            placeholder="Your code here..."
          />
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-secondary text-white rounded-r-full transition"
          >
            <SendHorizonal />
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ModalEnterCode;
