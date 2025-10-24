import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const quotes = [
  "Fashion that cares for our planet",
  "Sustainable style, conscious choices",
  "Wear the change you wish to see",
  "Ethical fashion for a better tomorrow",
  "Green is the new black",
];

export function GlobeHero() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentQuote = quotes[quoteIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentQuote.length) {
            setDisplayText(currentQuote.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setQuoteIndex((prev) => (prev + 1) % quotes.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, quoteIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#b5d6b2] via-[#f2ebd9] to-[#2e4e2c]">
      {/* 🌍 Rotating Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="w-64 h-64 md:w-96 md:h-96">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full animate-spin-slow"
              style={{ animationDuration: "20s" }}
            >
              <defs>
                <linearGradient
                  id="globeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#2e4e2c" />
                  <stop offset="100%" stopColor="#b5d6b2" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="url(#globeGradient)"
                opacity="0.8"
              />
              <ellipse
                cx="100"
                cy="100"
                rx="80"
                ry="40"
                fill="none"
                stroke="#2e4e2c"
                strokeWidth="2"
                opacity="0.6"
              />
              <ellipse
                cx="100"
                cy="100"
                rx="40"
                ry="80"
                fill="none"
                stroke="#2e4e2c"
                strokeWidth="2"
                opacity="0.6"
              />
              <path
                d="M 20 100 Q 100 80 180 100 T 20 100"
                fill="none"
                stroke="#2e4e2c"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <path
                d="M 20 70 Q 100 50 180 70"
                fill="none"
                stroke="#2e4e2c"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <path
                d="M 20 130 Q 100 150 180 130"
                fill="none"
                stroke="#2e4e2c"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <circle cx="60" cy="60" r="3" fill="#f2ebd9" />
              <circle cx="140" cy="80" r="3" fill="#f2ebd9" />
              <circle cx="100" cy="120" r="3" fill="#f2ebd9" />
              <circle cx="70" cy="140" r="3" fill="#f2ebd9" />
              <circle cx="130" cy="140" r="3" fill="#f2ebd9" />
            </svg>
          </div>

          {/* Inner pulse animation */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full backdrop-blur-sm" />
          </motion.div>
        </motion.div>
      </div>

      {/* 📝 Dynamic Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center px-4 mt-80 md:mt-96"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow">
            Discover Earth-Friendly Fashion Brands
          </p>
        </motion.div>
      </div>

      {/* ↓ Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-center"
        >
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <p className="text-sm mt-2">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
