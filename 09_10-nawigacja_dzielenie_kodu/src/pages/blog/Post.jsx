import { Link, useParams } from "react-router-dom";

function Post() {
  const { postId, category } = useParams();
  return (
    <>
      <p>
        <Link to="/blog">/ blog</Link> / <Link to="">{category}</Link> /{" "}
        {postId}
      </p>
      <h1>Single post</h1>
      <h2>Post Category: {category}</h2>
      <h2>Post ID: {postId}</h2>
    </>
  );
}

export default Post;
