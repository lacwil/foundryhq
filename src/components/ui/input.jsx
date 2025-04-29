// src/components/ui/input.jsx
import React from "react";

export function Input({ ...props }) {
  return (
    <input
      className="border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:bg-gray-800 dark:text-white"
      {...props}
    />
  );
}
