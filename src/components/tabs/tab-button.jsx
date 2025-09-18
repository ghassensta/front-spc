import React from "react";
import { motion } from "framer-motion";

export default function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-2xl font-semibold italic transition-colors duration-300 text-secondary`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="underline"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded"
        />
      )}
    </button>
  );
}