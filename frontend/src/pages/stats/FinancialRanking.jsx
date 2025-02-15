import React from 'react'
import { Link } from 'react-router-dom';

const financialRankings = [
  "Most Valuable Players",
  "Highest-Paid Players",
  "Best Value for Money"
];


const FinancialRanking = () => {
  return (
    <div>
    <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        Financial Rankings
      </h2>
      
    </div>

    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {financialRankings.map((category, index) => (
        <Link
          key={index}
          to={`/table/${category.toLowerCase().split(" ").join("-")}`}
          className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <svg
            className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"
            ></path>
          </svg>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {category}
          </span>
        </Link>
      ))}
    </div>
  </div>
  )
}

export default FinancialRanking