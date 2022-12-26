import "./Post.css";

import { useState } from "react";

import { ReadMoreModal } from "../ReadMoreModal/ReadMoreModal";

export function Post({ content }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenReadMoreModal() {
    setIsModalOpen(true);
  }

  function handleCloseReadMoreModal() {
    setIsModalOpen(false);
  }
  return (
    <div key={content.id} className="post__container">
      <ReadMoreModal
        postTitle={content.title}
        postContent={content.postContent}
        handleClose={handleCloseReadMoreModal}
        isOpen={isModalOpen}
      />

      <div className="post__header">
        <h1 className="post__title">{content.title}</h1>

        <h3 className="author">By: {content.authorName}</h3>
      </div>

      <p className="post__description">{content.description}</p>

      <button className="readmore__button" onClick={handleOpenReadMoreModal}>
        Read more
      </button>
    </div>
  );
}
