const QuoteCard = ({ quote, author }) => {
  return (
    <div className="group border-b border-gray-200/80 py-6 transition-colors hover:bg-gray-50/50 px-3 rounded-lg">
      <p className="text-lg font-medium text-gray-900 leading-relaxed font-serif">
        <span className="text-gray-400 font-serif text-2xl mr-1">“</span>
        {quote}
        <span className="text-gray-400 font-serif text-2xl ml-1">”</span>
      </p>

      <p className="mt-3 text-sm font-medium text-gray-500 flex items-center gap-2">
        <span className="text-gray-300">—</span>
        <span className="group-hover:text-gray-700 transition-colors">
          {author}
        </span>
      </p>
    </div>
  );
};

export default QuoteCard;
