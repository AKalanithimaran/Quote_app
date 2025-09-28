import { useState } from "react";
import "../custom.css";

const AddQuotes = () => {
  const [quote, setQuote] = useState({ text: "", author: "", book: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      quote: quote.text,
      author: quote.author,
      book: quote.book,
    };

    try {
      const res = await fetch("http://localhost:5000/api/quotes/addquote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Quote added!");
        setMessageType("success");
        setQuote({ text: "", author: "", book: "" });
      } else {
        setMessage(data.message || data.error || "Something went wrong.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
      setMessageType("error");
    }
  };

  const inputClasses =
    "w-full p-3 rounded-md bg-softGray text-elegantWhite border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition duration-300 font-serif";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 font-sans text-elegantWhite"
    >
      {/* Quote Input */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Quote"
          value={quote.text}
          onChange={(e) => setQuote({ ...quote, text: e.target.value })}
          className={inputClasses}
          required
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-30 group-focus-within:opacity-80 transition">
          💬
        </div>
      </div>

      {/* Author Input */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Author"
          value={quote.author}
          onChange={(e) => setQuote({ ...quote, author: e.target.value })}
          className={inputClasses}
          required
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-30 group-focus-within:opacity-80 transition">
          ✍️
        </div>
      </div>

      {/* Book Input */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Book"
          value={quote.book}
          onChange={(e) => setQuote({ ...quote, book: e.target.value })}
          className={inputClasses}
          required
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-30 group-focus-within:opacity-80 transition">
          📖
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-flat">
        ➕ Add Quote
      </button>

      {/* Plain Text Feedback */}
      {message && (
        <div
          className={`mt-4 text-sm font-medium px-4 py-2 rounded-md border transition duration-500 ${
            messageType === "success"
              ? "text-green-400 bg-green-900/30 border-green-600"
              : "text-red-400 bg-red-900/30 border-red-600 shake"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default AddQuotes;
