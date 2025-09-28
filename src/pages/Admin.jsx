// src/pages/Admin.jsx
import React from "react";
import AddQuotes from "../components/AddQuote";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-white text-white flex items-center justify-center px-4 py-10">
      <div className="bg-black/70 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center underline underline-offset-4 decoration-white">
          ✍️ Add New Quote
        </h2>

        <AddQuotes />
      </div>
    </div>
  );
};

export default Admin;
