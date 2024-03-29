import "./Home.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FeedLoader, Header, Pagination } from "../../components";

import { usePost } from "../../hooks";

import { useGlobalUser } from "../../context";

import { POSTS_LOAD_ERROR, WEBSITE_PATHS } from "../../constants";

export function Home() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [posts, setPosts] = useState([]);
  const [globalUser] = useGlobalUser();

  const { getPosts } = usePost();

  const navigate = useNavigate();

  useEffect(() => {
    !globalUser.id ? navigate(WEBSITE_PATHS.LOGIN) : handleLoadPosts();
  }, [, page]);

  async function handleLoadPosts() {
    try {
      const params = {
        userId: globalUser.id,
        page: page,
      };

      const { content, totalPages } = await getPosts(params);

      setTotalPages(totalPages);
      setPosts(content);
    } catch {
      toast.error(POSTS_LOAD_ERROR);
    }
  }

  return (
    <div className="home__container">
      <Header />

      <main className="feed__container">
        <FeedLoader posts={posts} />
      </main>

      <footer className="footer">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </footer>
    </div>
  );
}
