// pages/Liked.jsx
import QuoteCard from "../components/QuoteCard";

const Liked = () => {
  const likedQuotes = JSON.parse(localStorage.getItem("likedQuotes") || "[]");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-400 underline">
        ❤️ Liked Quotes
      </h1>

      {likedQuotes.length === 0 ? (
        <p className="text-center text-lg text-gray-400">No liked quotes yet.</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {likedQuotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Liked;
