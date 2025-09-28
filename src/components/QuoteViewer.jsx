import { useState, useEffect, useRef } from "react";
import QuoteCard from "../components/QuoteCard";
import FloatingShareButton from "../components/Shareoption";
import axios from "axios";
import { io } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";

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
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const timerRef = useRef(null);

  // Fetch quotes and set up socket
  useEffect(() => {
    fetchQuotes();

    const socket = io("mysql://us7y7q2dqpsunjjh:9RsXkn3P886FvrBiSpTM@bx1hro7vzhrd42deescx-mysql.services.clever-cloud.com:3306/bx1hro7vzhrd42deescx", {
      transports: ["websocket"],
    });

    socket.on("newQuote", (newQuote) => {
      setQuotes((prev) => [newQuote, ...prev]);
      setIndex(0);
    });

    return () => socket.disconnect();
  }, []);

  // Fetch from API
  const fetchQuotes = async () => {
    try {
      const res = await axios.get("mysql://us7y7q2dqpsunjjh:9RsXkn3P886FvrBiSpTM@bx1hro7vzhrd42deescx-mysql.services.clever-cloud.com:3306/bx1hro7vzhrd42deescx/api/quotes/getquote");
      setQuotes(res.data);
      setIndex(0);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    }
  };

  // Manual next/prev
  const nextQuote = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const deleteQuote = async () => {
  if (quotes.length === 0) return;

  const quoteToDelete = quotes[index];

  try {
    // Call backend DELETE API
    await axios.delete(`mysql://us7y7q2dqpsunjjh:9RsXkn3P886FvrBiSpTM@bx1hro7vzhrd42deescx-mysql.services.clever-cloud.com:3306/bx1hro7vzhrd42deescx/api/quotes/${quoteToDelete.id}`);

    const newQuotes = quotes.filter((_, i) => i !== index);
    setQuotes(newQuotes);

    if (newQuotes.length === 0) {
      setIndex(0);
    } else {
      setIndex((prev) => Math.max(0, prev % newQuotes.length));
    }
  } catch (error) {
    console.error("Failed to delete quote:", error);
    alert("Failed to delete the quote from the server.");
  }
};
  
  //Like quote
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

  // Share quote
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
    if (quotes.length === 0) return;

    // Clear previous interval
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % quotes.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, [index, quotes]);

  if (quotes.length === 0) {
    return <p className="text-gray-700 p-6 text-lg">Loading quotes...</p>;
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
