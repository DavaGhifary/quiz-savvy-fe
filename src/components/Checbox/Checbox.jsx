import React, { useState } from "react";
import { Check } from "lucide-react";

// Checkbox Komponen
const Checkbox = ({ isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <label className="w-6 h-6 relative flex items-center justify-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={onChange}
        />
        <div className="w-6 h-6 rounded-full border-2 border-black peer-checked:bg-black peer-checked:border-black"></div>
        <Check className="w-4 h-4 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
      </label>
    </div>
  );
};

export default Checkbox;
