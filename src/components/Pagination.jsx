import React from 'react';
import { useSpring, animated } from 'react-spring';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const buttonSpring = useSpring({
    scale: 1,
    from: { scale: 0.8 },
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="flex justify-center items-center mt-8">
      <animated.button
        style={buttonSpring}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white text-[#025951] font-semibold py-2 px-4 rounded-l-full shadow-lg hover:bg-[#b2f3cc] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </animated.button>
      <span className="bg-white text-[#025951] font-semibold py-2 px-4 shadow-lg">
        {currentPage} / {totalPages}
      </span>
      <animated.button
        style={buttonSpring}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white text-[#025951] font-semibold py-2 px-4 rounded-r-full shadow-lg hover:bg-[#b2f3cc] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </animated.button>
    </div>
  );
};

export default Pagination;