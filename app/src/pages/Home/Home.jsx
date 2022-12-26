import "./Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FeedLoader, Header } from "../../components";

import { usePost } from "../../hooks";

import { useGlobalUser } from "../../context";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [globalUser] = useGlobalUser();

  const { getPosts } = usePost();

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedUser();
    handleLoadPosts();
  }, []);

  function getLoggedUser() {
    if (globalUser === null) {
      navigate("/");
    }
  }

  async function handleLoadPosts() {
    const response = await getPosts(globalUser.id);

    setPosts(response.content);
  }

  return (
    <div className="home__container">
      <Header />

      <main className="feed__container">
        <FeedLoader posts={posts} />
      </main>
    </div>
  );
}
