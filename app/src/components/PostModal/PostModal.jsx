import "./PostModal.css";

import { useEffect, useState } from "react";
import { usePost } from "../../hooks";

export function PostModal({ isOpen, handleClose, user }) {
  const [authorId, setAuthorId] = useState();
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorPicture, setAuthorPicture] = useState("");
  const [post, setPost] = useState({});

  const { addPost } = usePost();

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    setAuthorId(user.id);
    setAuthorEmail(user.email);
    setAuthorName(user.name);
    setAuthorPicture(user.profilePicture);
  }

  async function handleAddPost(e) {
    e.preventDefault();

    post.authorId = authorId;
    post.authorEmail = authorEmail;
    post.authorName = authorName;
    post.authorPicture = authorPicture;

    const response = await addPost(post);
    // TODO: Sucess toast
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
