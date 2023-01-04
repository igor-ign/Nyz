import "./Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FeedLoader, Header, Pagination } from "../../components";

import { usePost } from "../../hooks";

import { useGlobalUser } from "../../context";

export function Home() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [posts, setPosts] = useState([]);
  const [isPreviousPageButtonBlocked, setIsPreviousPageButtonBlocked] =
    useState(true);
  const [isNextPageButtonBlocked, setIsNextPageButtonBlocked] = useState(false);
  const [globalUser] = useGlobalUser();

  const { getPosts } = usePost();

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedUser();
    handleLoadPosts();
  }, [, page]);

  function getLoggedUser() {
    if (globalUser === null) {
      navigate("/");
    }
  }

  async function handleLoadPosts() {
    // TODO : add try catch
    const params = {
      userId: globalUser.id,
      page: page,
    };

    const response = await getPosts(params);

    setTotalPages(response.totalPages);
    setPosts(response.content);
  }

  return (
    <div className="home__container">
      <Header />

      <main className="feed__container">
        <FeedLoader posts={posts} />
      </main>

      <footer className="footer">
        <Pagination
          page={page}
          totalPages={totalPages}
          isPreviousPageButtonBlocked={isPreviousPageButtonBlocked}
          isNextPageButtonBlocked={isNextPageButtonBlocked}
          setIsNextPageButtonBlocked={setIsNextPageButtonBlocked}
          setIsPreviousPageButtonBlocked={setIsPreviousPageButtonBlocked}
          setPage={setPage}
        />
      </footer>
    </div>
  );
}
