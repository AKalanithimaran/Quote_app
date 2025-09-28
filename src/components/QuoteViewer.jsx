import { useState, useEffect, useRef } from "react";
import QuoteCard from "../components/QuoteCard";
import FloatingShareButton from "../components/Shareoption";
import { AnimatePresence, motion } from "framer-motion";
import quotes from "../datas/quotes";  // Your default quotes import

const AUTO_SLIDE_INTERVAL = 7000;

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.98,
  }),
};

const QuoteViewer = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);

  const nextQuote = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const deleteQuote = () => {
    // Since these are default quotes, deleting them doesn't make sense,
    // so just alert or skip this functionality.
    alert("Deleting default quotes is disabled.");
  };

  const handleLike = () => {
    const likedQuotes = JSON.parse(localStorage.getItem("likedQuotes") || "[]");
    const quote = quotes[index];
    const alreadyLiked = likedQuotes.some((q) => q.id === quote.id);

    if (!alreadyLiked) {
      likedQuotes.push(quote);
      localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
      alert("❤️ Quote Liked!");
    } else {
      alert("Already liked!");
    }
  };

  const handleShare = async () => {
    const quote = quotes[index];
    const shareText = `"${quote.text}" — ${quote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Quote",
          text: shareText,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard!");
    }
  };

  // Auto slide every X seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextQuote();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, []);

  if (quotes.length === 0) {
    return <p className="text-gray-700 p-6 text-lg">No quotes available.</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-white to-softGray p-6 font-serif overflow-x-hidden relative">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={quotes[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full flex justify-center"
        >
          <QuoteCard
            quote={quotes[index]}
            onLike={handleLike}
            onPrevious={prevQuote}
            onNext={nextQuote}
            onDelete={deleteQuote}
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating share button */}
      <FloatingShareButton onShare={handleShare} />
    </div>
  );
};

export default QuoteViewer;
