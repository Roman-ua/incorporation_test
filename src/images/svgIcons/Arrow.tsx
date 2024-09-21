import React from 'react';

const Arrow = () => {
  return (
    <svg
      className="rotate-180 w-6 stroke-white fill-white translate-x-1 group-hover:translate-x-3 transition-all duration-200 ease-in-out"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 32 32"
    >
      <path
        className="stroke-white fill-white"
        d="M28 14H8.8l4.62-4.62c.394-.394.58-.864.58-1.38 0-.984-.813-2-2-2-.531 0-.994.193-1.38.58l-7.958 7.958C2.334 14.866 2 15.271 2 16s.279 1.08.646 1.447l7.974 7.973c.386.387.849.58 1.38.58 1.188 0 2-1.016 2-2 0-.516-.186-.986-.58-1.38L8.8 18H28a2 2 0 0 0 0-4z"
      />
    </svg>
  );
};

export default Arrow;
