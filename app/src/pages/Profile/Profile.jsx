import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Header, Pagination, ReadMoreModal } from "../../components";

import { useGlobalUser } from "../../context";

import { usePost } from "../../hooks";

import {
  POSTS_LOAD_ERROR,
  WEBSITE_PATHS,
  POST_DELETE_ERROR,
  POST_DELETE_SUCCESS,
} from "../../constants";

import DEFAULT from "../../assets/default__profile__picture.svg";
import DELETE from "../../assets/delete__icon.svg";

export function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviousPageButtonBlocked, setIsPreviousPageButtonBlocked] =
    useState(false);
  const [isNextPageButtonBlocked, setIsNextPageButtonBlocked] = useState(false);

  const [globalUser] = useGlobalUser();

  const { getMyPosts, removePost } = usePost();
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

  async function handleDeletePost(postId) {
    try {
      await removePost(postId);
      getPosts();

      toast.success(POST_DELETE_SUCCESS);
    } catch {
      toast.error(POST_DELETE_ERROR);
    }
  }

  function handleCloseReadMoreModal() {
    setIsModalOpen(false);
  }

  function handleOpenReadMoreModal() {
    setIsModalOpen(true);
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

        <ul className="profile__posts" type="none">
          {/* TODO: Think about refactoring feed loader component to fit here */}
          {myPosts.map((post) => {
            return (
              <li className="profile__post" key={post.id}>
                <ReadMoreModal
                  postTitle={post.title}
                  postContent={post.postContent}
                  handleClose={handleCloseReadMoreModal}
                  isOpen={isModalOpen}
                />

                <div className="profile__post__header">
                  <h3 className="profile__post__title">{post.title}</h3>

                  <div className="post__actions">
                    <button
                      className="delete__post"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <img src={DELETE} alt="Delete" className="delete__icon" />
                    </button>
                  </div>
                </div>

                <p className="profile__post__description">{post.description}</p>
                <button
                  className="profile__post__button"
                  onClick={handleOpenReadMoreModal}
                >
                  Read More
                </button>
              </li>
            );
          })}
        </ul>

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
    </div>
  );
}
