import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "../utils";
import Card from "./Post/Card";

function Thread() {
  const [loadPosts, setLoadPosts] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  useEffect(() => {
    if (loadPosts) {
      dispatch(getPosts(count));
      setLoadPosts(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);

    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPosts, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => <Card key={post._id} post={post} />)}
      </ul>
    </div>
  );
}

export default Thread;
