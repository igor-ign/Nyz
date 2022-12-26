import { Post } from "../Post/Post";
import "./FeedLoader.css";

export function FeedLoader({ posts }) {
  return (
    <div className="feed__content">
      {posts.map((post) => {
        return <Post content={post} />;
      })}
    </div>
  );
}
