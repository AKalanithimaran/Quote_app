import { FaHeart, FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";

const QuoteCard = ({ quote, onLike, onPrevious, onNext, onDelete }) => {
    return (
        <div
            className="glass fancy-shadow transition-all duration-500 w-full max-w-2xl min-h-[360px]
                 p-8 bg-white text-gray-800 rounded-2xl shadow-xl relative border border-gray-200 font-serif
                 flex flex-col justify-between animate-fadeIn"
        >
            {/* 🗑️ Delete Button */}
            <button
                onClick={() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this quote?");
                    if (confirmDelete) {
                        onDelete();
                    }
                }}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
                title="Delete quote"
            >
                <FaTrash />
            </button>


            {/* Quote Content */}
            <div>
                <p className="text-3xl italic leading-relaxed text-gray-900 mb-6">
                    “{quote.text}”
                </p>
                <p className="text-lg font-bold text-gray-700 mb-1">— {quote.author}</p>
                {quote.book && (
                    <p className="text-sm text-gray-500 italic">{quote.book}</p>
                )}
            </div>

            {/* Controls */}
            <div className="mt-8 flex justify-between items-center border-t pt-4 border-gray-200 text-gray-600 font-sans">
                {onLike && (
                    <button
                        onClick={onLike}
                        className="like-button flex items-center gap-2 hover:text-rose-500 transition"
                    >
                        <FaHeart className="text-rose-400" /> Like
                    </button>
                )}
                <div className="flex gap-4">
                    {onPrevious && (
                        <button
                            onClick={onPrevious}
                            className="flex items-center gap-2 hover:text-indigo-500 transition"
                        >
                            <FaChevronLeft /> Previous
                        </button>
                    )}
                    {onNext && (
                        <button
                            onClick={onNext}
                            className="flex items-center gap-2 hover:text-indigo-500 transition"
                        >
                            Next <FaChevronRight />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuoteCard;
