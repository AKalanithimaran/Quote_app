import { useState, useEffect } from "react";
import { quotes } from "../data/quotes";
import QuoteCard from "./QuoteCard";
import FloatingShareButton from "./Shareoption"; // ✅ Import is correct

const QuoteViewer = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextQuote();
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const handleLike = () => {
    const likedQuotes = JSON.parse(localStorage.getItem("likedQuotes") || "[]");
    const quote = quotes[index];
    const alreadyLiked = likedQuotes.some((q) => q.text === quote.text);

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 relative">
      <QuoteCard
        quote={quotes[index]}
        onLike={handleLike}
        onShare={handleShare}
        onNext={nextQuote}
      />

      {/* ✅ Add this to render the floating share button */}
      <FloatingShareButton />
    </div>
  );
};

export default QuoteViewer;
