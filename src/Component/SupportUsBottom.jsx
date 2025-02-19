import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const WhatsAppButton = () => {
  const [bounce, setBounce] = useState(false);
  const navigate = useNavigate();

  // Animation interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 5000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate('/')
  };

  return (
    <div className="group relative">
      <motion.button
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeIn",
          delay: 10,
        }}
        onClick={handleClick}
        className={`fixed bottom-10 right-6 md:bottom-10 md:right-10 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-transform hover:scale-110 flex ${
          bounce ? "animate-bounce" : ""
        } items-center z-50`}
        aria-label="Generate New Link"
      >
        <div className="p-3 md:p-4">
          <IoIosAddCircleOutline className="w-10 h-10" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
            Generate New Link
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;