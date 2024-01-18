import { useState,useEffect } from 'react';
import React from 'react';

const Pagination = ({ postPerPage, totalPosts, currentPage, paginate }) => {
  const pagePerNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pagePerNumber.push(i);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const [maxVisiblePages, setMaxVisiblePages] = useState(2);

    useEffect(() => {
      const handleResize = () => {
        // Αλλάξτε το πλήθος των ορατών σελίδων ανάλογα με το πλάτος της οθόνης
        if (window.innerWidth > 900) {
          setMaxVisiblePages(5);
        } else {
          setMaxVisiblePages(2);
        }
      };
  
      // Προσθέστε έναν event listener για το resize της οθόνης
      window.addEventListener('resize', handleResize);
  
      // Καθαρίστε τον event listener κατά το unmount του component
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  

    if (pagePerNumber.length <= maxVisiblePages) {
      // Εάν τα pages είναι λιγότερα ή ίσα με το maxVisiblePages, εμφανίστε τα όλα.
      pageNumbers.push(...pagePerNumber);
    } else {
      // Διαφορετικά, υπολογίστε τα ορατά pages με τα "..."
      const leftSide = Math.floor(maxVisiblePages / 2);
      // const rightSide = Math.ceil(maxVisiblePages / 2);
      let startPage;

      if (currentPage > pagePerNumber.length - maxVisiblePages + 1) {
        startPage = pagePerNumber.length - maxVisiblePages + 1;
      } else {
        startPage = currentPage - leftSide;
        startPage = Math.max(startPage, 1);
      }

      for (let i = startPage; i < startPage + maxVisiblePages; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 1) {
        pageNumbers.unshift('...');
        pageNumbers.unshift(1);
      }

      if (startPage + maxVisiblePages - 1 < pagePerNumber.length) {
        pageNumbers.push('...');
        pageNumbers.push(pagePerNumber.length);
      }
    }

    return pageNumbers;
  };

  return (
    <nav className=" sm:w-auto flex justify-center">
      <ul className="flex my-10 items-center">
        <li>
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="text-white px-2 py-1 bg-gray-800 hover:bg-gray-600 rounded-md transition duration-300"
          >
            &lt;&lt;
          </button>
        </li>
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-white px-2 py-1 bg-gray-800 hover:bg-gray-600 rounded-md transition duration-300"
          >
            &lt;
          </button>
        </li>
        {renderPageNumbers().map((number, index) => (
          <li key={index}>
            <a
              href="!#"
              className={`text-white px-4 py-2 ${currentPage === number ? 'font-extrabold bg-gray-700' : ''} hover:bg-gray-600 rounded-md transition duration-300`}
              onClick={() => (typeof number === 'number' ? paginate(number) : null)}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalPosts / postPerPage)}
            className="text-white px-2 py-1 bg-gray-800 hover:bg-gray-600 rounded-md transition duration-300"
          >
            &gt;
          </button>
        </li>
        <li>
          <button
            onClick={() => paginate(Math.ceil(totalPosts / postPerPage))}
            disabled={currentPage === Math.ceil(totalPosts / postPerPage)}
            className="text-white px-2 py-1 bg-gray-800 hover:bg-gray-600 rounded-md transition duration-300"
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

