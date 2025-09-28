import { useState, useEffect, useRef } from "react";
import QuoteCard from "../components/QuoteCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import "../custom.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cardVariants = {
  initial: (i) => ({
    scale: 1 - i * 0.02,
    x: -i * 20,
    y: i * 10,
    opacity: i === 0 ? 1 : 0.85,
    zIndex: 10 - i,
    rotate: i === 0 ? -1 : 0,
  }),
  animate: (i) => ({
    scale: 1 - i * 0.02,
    x: -i * 20,
    y: i * 10,
    opacity: i === 0 ? 1 : 0.85,
    zIndex: 10 - i,
    rotate: i === 0 ? -1 : 0,
    transition: { duration: 0.4 },
  }),
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

const Liked = () => {
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const autoPlayRef = useRef();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedQuotes") || "[]");
    setLikedQuotes(stored);
  }, []);

  useEffect(() => {
    autoPlayRef.current = nextQuote;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragging) autoPlayRef.current();
    }, 7000);
    return () => clearInterval(interval);
  }, [dragging]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (id) => {
    const updated = likedQuotes.filter((quote) => quote.id !== id);
    setLikedQuotes(updated);
    localStorage.setItem("likedQuotes", JSON.stringify(updated));
    toast.warning("💔 Quote unliked");
    if (activeIndex >= updated.length) {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const nextQuote = () => {
    if (likedQuotes.length > 1) {
      setActiveIndex((prev) => (prev + 1) % likedQuotes.length);
    }
  };

  const prevQuote = () => {
    if (likedQuotes.length > 1) {
      setActiveIndex((prev) => (prev - 1 + likedQuotes.length) % likedQuotes.length);
    }
  };

  const handleDragEnd = (event, info) => {
    const swipe = info.offset.x;
    if (swipe < -100) {
      nextQuote();
    } else if (swipe > 100) {
      prevQuote();
    }
    setDragging(false);
    setShowHint(false);
  };

  return (
    <div className="liked-page min-h-screen bg-blue-100 flex flex-col items-center justify-center px-6 py-12 font-serif relative">
      <ToastContainer />

      <div className="flex items-center justify-center gap-4 mb-10 animate-fadeIn">
        <FaHeart className="text-rose-500 text-4xl animate-bounce-slow" />
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide underline">
          Liked Quotes
        </h1>
        <FaHeart className="text-rose-500 text-4xl animate-bounce-slow reverse" />
      </div>

      {likedQuotes.length === 0 ? (
        <p className="text-center text-lg text-gray-500 animate-fadeInSlow">
          No liked quotes yet.
        </p>
      ) : (
        <div className="relative w-full max-w-xl h-[400px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {likedQuotes
              .slice(activeIndex, activeIndex + 3)
              .map((quote, i) => (
                <motion.div
                  key={quote.id}
                  className="absolute w-full cursor-grab active:cursor-grabbing"
                  custom={i}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  drag={i === 0 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={handleDragEnd}
                >
                  <QuoteCard
                    quote={quote}
                    onLike={() => toggleLike(quote.id)}
                    onPrevious={prevQuote}
                    onNext={nextQuote}
                    onDelete={() => toggleLike(quote.id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 right-6 text-gray-500 text-sm flex items-center gap-2 animate-fadeInSlow"
            >
              <span>Swipe</span>
              <FaArrowRight className="text-lg animate-pulse" />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Liked;
