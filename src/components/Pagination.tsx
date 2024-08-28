import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of the current page
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-orange-500 text-white disabled:bg-orange-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((number, index) =>
        number === "..." ? (
          <span key={index} className="w-10 text-center">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(number as number)}
            className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              currentPage === number
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-100"
            }`}
          >
            {number}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-orange-500 text-white disabled:bg-orange-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;
