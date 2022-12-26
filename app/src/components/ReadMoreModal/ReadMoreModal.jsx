import "./ReadMoreModal.css";

export function ReadMoreModal({ postTitle, postContent, handleClose, isOpen }) {
  return (
    <div className={`readmore__modal__container ${isOpen}`}>
      <div className="readmore__content">
        <div className="readmore__close" onClick={handleClose}>
          X
        </div>
        <h1 className="readmore__title">{postTitle}</h1>
        <p className="readmore__text">{postContent}</p>
      </div>
    </div>
  );
}
