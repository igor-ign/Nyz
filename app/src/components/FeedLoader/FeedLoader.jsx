import "./FeedLoader.css";

import { useState } from "react";

import { ReadMoreModal } from "../ReadMoreModal/ReadMoreModal";

export function FeedLoader({ posts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenReadMoreModal(post) {
    setIsModalOpen(true);
  }

  function handleCloseReadMoreModal() {
    setIsModalOpen(false);
  }

  //TODO: Fix readmore modal bug
  return (
    <div className="feed__content">
      {posts.map((post) => {
        return (
          <div key={post.id} className="post__container">
            <ReadMoreModal
              postTitle={post.title}
              postContent={post.postContent}
              handleClose={handleCloseReadMoreModal}
              isOpen={isModalOpen}
            />

            <div className="post__header">
              <h3 className="post__title">{post.title}</h3>

              <h4 className="author">By: {post.authorName}</h4>
            </div>

            <p className="post__description">{post.description}</p>

            <button
              className="readmore__button"
              onClick={() => handleOpenReadMoreModal(post)}
            >
              Read more
            </button>
          </div>
        );
      })}
    </div>
  );
}
