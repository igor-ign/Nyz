import "./PostModal.css";

import { useState } from "react";

import { usePost } from "../../hooks";

import { ADD_POST } from "../../constants";

export function PostModal({
  isOpen,
  handleClose,
  user,
  sucessToast,
  errorToast,
}) {
  const [post, setPost] = useState({});

  const { addPost } = usePost();

  async function handleAddPost(e) {
    e.preventDefault();

    try {
      const params = {
        authorId: user.id,
        authorEmail: user.email,
        authorName: user.name,
        authorPicture: user.profilePicture,
        ...post,
      };

      await addPost(params);
      sucessToast(ADD_POST.SUCCESS);
      handleClose();
    } catch (e) {
      errorToast(ADD_POST.ERROR);
      handleClose();
    }
  }

  function handlePostChange(e) {
    const { value, id } = e.target;

    const newPost = { ...post, [id]: value };

    setPost(newPost);
  }

  return (
    <div className={`modal__container ${isOpen}`}>
      <div className="modal__content">
        <button className="close__modal" onClick={handleClose}>
          X
        </button>

        <form action="" className="post__form" onSubmit={handleAddPost}>
          <span className="post__label">
            <h3 className="post__title">Title</h3>
            <input
              type="text"
              placeholder="Your post title"
              className="post__input title"
              id="title"
              onChange={handlePostChange}
            />
          </span>

          <span className="post__label">
            <h3 className="post__title">Description</h3>
            <textarea
              name=""
              id="description"
              cols="30"
              rows="4"
              placeholder="Your post description"
              className="post__input"
              onChange={handlePostChange}
            ></textarea>
          </span>

          <span className="post__label">
            <h3 className="post__title">Content</h3>
            <textarea
              name=""
              id="postContent"
              cols="30"
              rows="4"
              placeholder="Share something with the community"
              className="post__input"
              onChange={handlePostChange}
            ></textarea>
          </span>

          <button className="post__button">Share</button>
        </form>
      </div>
    </div>
  );
}
