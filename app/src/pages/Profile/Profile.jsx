import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Header, Pagination, PersonalPostsLoader } from "../../components";

import { useGlobalUser } from "../../context";

import { usePost } from "../../hooks";

import { POSTS_LOAD_ERROR, WEBSITE_PATHS } from "../../constants";

import DEFAULT from "../../assets/default__profile__picture.svg";

export function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [globalUser] = useGlobalUser();

  const { getMyPosts } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    !globalUser.id ? navigate(WEBSITE_PATHS.LOGIN) : getPosts();
  }, []);

  async function getPosts() {
    try {
      const params = {
        id: globalUser.id,
        page,
      };

      const { content, totalPages } = await getMyPosts(params);
      setMyPosts(content);
      setTotalPages(totalPages);
    } catch {
      toast.error(POSTS_LOAD_ERROR);
    }
  }

  return (
    <div className="profile__container">
      <Header />

      <div className="profile__content">
        <div className="user__info">
          <img
            src={globalUser.profilePicture || DEFAULT}
            alt="User"
            className="user__profile__picture"
          />
          <h3 className="profile__username">{globalUser.name}</h3>
        </div>

        <PersonalPostsLoader posts={myPosts} updatePosts={getPosts} />

        <footer className="footer">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </footer>
      </div>
    </div>
  );
}
