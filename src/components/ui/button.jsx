// src/components/ui/button.jsx
import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}
