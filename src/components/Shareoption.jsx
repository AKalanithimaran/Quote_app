import React, { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FloatingShareButton = () => {
  const [showModal, setShowModal] = useState(false);

  const shareUrl = "https://your-website.com";
  const shareText = "Check this out! 🔥";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        aria-label="Share"
      >
        <FaShareAlt size={24} />
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-80 shadow-lg relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">Share</h2>
            <div className="grid grid-cols-3 gap-4 text-center text-xl text-white">
              <a
                href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-3 rounded-md hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 p-3 rounded-md hover:bg-blue-900 transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <button
                onClick={copyToClipboard}
                className="bg-gray-500 p-3 rounded-md hover:bg-gray-600 transition-colors col-span-3"
              >
                <div className="flex items-center justify-center gap-2 text-sm">
                  <FaCopy />
                  Copy Link
                </div>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-center" />
    </>
  );
};

export default FloatingShareButton;
