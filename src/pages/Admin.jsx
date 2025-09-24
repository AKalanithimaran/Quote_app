// pages/Admin.jsx
import { useState } from "react";

const Admin = () => {
  const [quote, setQuote] = useState({
    text: "",
    author: "",
    book: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("adminQuotes") || "[]");
    existing.push(quote);
    localStorage.setItem("adminQuotes", JSON.stringify(existing));
    alert("✅ Quote added!");
    setQuote({ text: "", author: "", book: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center underline">
          ✍️ Add New Quote
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Quote"
            value={quote.text}
            onChange={(e) => setQuote({ ...quote, text: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={quote.author}
            onChange={(e) => setQuote({ ...quote, author: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            placeholder="Book"
            value={quote.book}
            onChange={(e) => setQuote({ ...quote, book: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white py-3 rounded font-semibold shadow-md"
          >
            ➕ Add Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
