import "./Pagination.css";

import { useEffect } from "react";

export function Pagination({
  page,
  totalPages,
  isPreviousPageButtonBlocked,
  isNextPageButtonBlocked,
  setIsNextPageButtonBlocked,
  setIsPreviousPageButtonBlocked,
  setPage,
}) {
  useEffect(() => {
    handleBlockButtons();
  }, [, page]);

  function handleBlockButtons() {
    const isPageNotInitial = page >= 1;
    const isFinalPage = page > totalPages - 2;

    isPageNotInitial
      ? setIsPreviousPageButtonBlocked(false)
      : setIsPreviousPageButtonBlocked(true);
    isFinalPage
      ? setIsNextPageButtonBlocked(true)
      : setIsNextPageButtonBlocked(false);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function renderPagination() {
    const isPages = totalPages > 1;

    if (isPages) {
      return (
        <div className="pagination__container">
          <button
            className="pagination__button"
            onClick={handlePreviousPage}
            disabled={isPreviousPageButtonBlocked}
          >
            Previous
          </button>
          <button
            className="pagination__button"
            onClick={handleNextPage}
            disabled={isNextPageButtonBlocked}
          >
            Next
          </button>
        </div>
      );
    }
  }

  return renderPagination();
}
