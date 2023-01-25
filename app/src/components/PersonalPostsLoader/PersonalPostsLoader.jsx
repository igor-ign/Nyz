import "./PersonalPostsLoader.css";

import { useState } from "react";
import { toast } from "react-toastify";

import { ReadMoreModal } from "../../components";

import { usePost } from "../../hooks";

import { POST_DELETE_ERROR, POST_DELETE_SUCCESS } from "../../constants";

import DELETE from "../../assets/delete__icon.svg";

export function PersonalPostsLoader({ posts, updatePosts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const { removePost } = usePost();

  function handleOpenReadMoreModal(post) {
    setSelectedPost(post);
    setIsModalOpen(true);
  }

  function handleCloseReadMoreModal() {
    setIsModalOpen(false);
  }

  async function handleDeletePost(postId) {
    try {
      await removePost(postId);
      updatePosts();

      toast.success(POST_DELETE_SUCCESS);
    } catch {
      toast.error(POST_DELETE_ERROR);
    }
  }

  return (
    <ul className="profile__posts" type="none">
      {posts.map((post) => {
        return (
          <li className="profile__post" key={post.id}>
            <ReadMoreModal
              postTitle={selectedPost.title}
              postContent={selectedPost.postContent}
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
  );
}
