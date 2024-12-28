import React from "react";
import { Check } from "lucide-react"; // Impor ikon dari Lucide

const Checkbox = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Checkbox Kustom */}
      <label className="w-6 h-6 relative flex items-center justify-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer" // sr-only untuk menyembunyikan input asli
        />
        {/* Lingkaran Luar */}
        <div className="w-6 h-6 rounded-full border-2 border-black peer-checked:bg-black peer-checked:border-black"></div>
        {/* Icon Centang dari Lucide */}
        <Check
          className="w-4 h-4 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
        />
      </label>
    </div>
  );
};

export default Checkbox;
