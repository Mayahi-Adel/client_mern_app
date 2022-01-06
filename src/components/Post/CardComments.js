import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { timestampParser } from "../../utils";
import FollowUser from "../Profil/FollowUser";
import EditDeleteComment from "./EditDeleteComment";

function CardComments({ post }) {
  const [comment, setComment] = useState("");

  const usersData = useSelector((state) => state.users);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleComments = (e) => {
    e.preventDefault();

    if (comment) {
      dispatch(addComment(post._id, userData._id, comment, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setComment(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={usersData?.users
                  ?.map((user) => {
                    if (user._id === comment.commenterId) return user.picture;
                    else return null;
                  })
                  .join("")}
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  <span>
                    {comment.commenterId !== userData._id && (
                      <FollowUser
                        idToFollow={comment.commenterId}
                        type={"card"}
                      />
                    )}
                  </span>
                </div>
                <span>{timestampParser(comment.timestamps)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form onSubmit={handleComments} className="comment-form">
          <input
            type="text"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Laisser un commentaire"
          />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
}

export default CardComments;
