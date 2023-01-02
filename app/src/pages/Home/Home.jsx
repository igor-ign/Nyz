import "./Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FeedLoader, Header } from "../../components";

import { usePost } from "../../hooks";

import { useGlobalUser } from "../../context";

export function Home() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isPreviousPageButtonBlocked, setIsPreviousPageButtonBlocked] =
    useState(false);
  const [isNextPageButtonBlocked, setIsNextPageButtonBlocked] = useState(false);
  const [globalUser] = useGlobalUser();

  const { getPosts } = usePost();

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedUser();
    handleLoadPosts();
  }, [page]);

  function getLoggedUser() {
    if (globalUser === null) {
      navigate("/");
    }
  }

  async function handleLoadPosts() {
    const params = {
      userId: globalUser.id,
      page: page,
    };

    const response = await getPosts(params);

    setTotalPages(response.totalPages);
    setPosts(response.content);
    handleBlockButtons();
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

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

  return (
    <div className="home__container">
      <Header />

      <main className="feed__container">
        <FeedLoader posts={posts} />
      </main>

      <footer className="footer">
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
      </footer>
    </div>
  );
}
