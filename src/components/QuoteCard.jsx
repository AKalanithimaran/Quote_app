import FloatingShareButton from "./Shareoption";

const QuoteCard = ({ quote, onLike, onPrevious, onNext }) => {
    return (
        <div className="p-6 w-full max-w-xl bg-gray-800 text-white rounded-xl shadow-lg transition-all duration-300">
            <p className="text-2xl italic text-indigo-300">"{quote.text}"</p>
            <p className="mt-4 font-semibold text-lg text-white">— {quote.author}</p>
            <p className="text-sm text-gray-400">{quote.book}</p>

            <div className="mt-6 flex flex-wrap justify-around gap-4 border-t pt-4 border-gray-600">
                <button
                    onClick={onLike}
                    className="flex items-center gap-1 text-pink-400 hover:text-pink-600 transition-colors"
                >
                    ❤️ Like
                </button>

                <button
                    onClick={onPrevious}
                    className="flex items-center gap-1 text-green-400 hover:text-green-600 transition-colors"
                >
                    ⏮️ Previous
                </button>

                <button
                    onClick={onNext}
                    className="flex items-center gap-1 text-green-400 hover:text-green-600 transition-colors"
                >
                    ⏭️ Next
                </button>
            </div>
        </div>
    );
};

export default QuoteCard;
