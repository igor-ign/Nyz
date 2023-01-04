import "./Profile.css";

import { useEffect, useState } from "react";

import { Header, Pagination, ReadMoreModal } from "../../components";

import { useGlobalUser } from "../../context";

import { usePost } from "../../hooks";

import DEFAULT from "../../assets/default__profile__picture.svg";

export function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviousPageButtonBlocked, setIsPreviousPageButtonBlocked] =
    useState(false);
  const [isNextPageButtonBlocked, setIsNextPageButtonBlocked] = useState(false);

  const [globalUser] = useGlobalUser();

  const { getMyPosts } = usePost();

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const params = {
        id: globalUser.id,
        page,
      };

      const response = await getMyPosts(params);
      setMyPosts(response.content);
      setTotalPages(response.totalPages);
    } catch (e) {
      console.error(e);
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
          {myPosts.map((post) => {
            return (
              <li className="profile__post">
                <ReadMoreModal
                  postTitle={post.title}
                  postContent={post.postContent}
                  handleClose={handleCloseReadMoreModal}
                  isOpen={isModalOpen}
                />

                <div className="profile__post__header">
                  <h3 className="profile__post__title">{post.title}</h3>
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
