import React from "react";

interface PaginationProps {
  postsPerPage: number;
  length: number;
  currentPage: number;
  isChangeTheme:boolean;
  handlePagination: (pageNumber: number) => void;
}

const Pagination = ({ postsPerPage, length, currentPage,isChangeTheme, handlePagination }: PaginationProps) => {
  const paginationNumbers = [];
  const totalPages = Math.ceil(length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className={`pagination `}>
      <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {paginationNumbers.map((pageNumber) => (
        <button
          onClick={() => handlePagination(pageNumber)}
          key={pageNumber}
          className={currentPage === pageNumber ? "active" : ""}
          disabled={currentPage === pageNumber} // Disable current page button
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
