import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "w-8 h-8", className = "" }) => {
  return (
    <motion.div
      className={`${size} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    >
      <img 
        src="/scrolltotop.png"
        alt="Loading..."
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default LoadingSpinner;
