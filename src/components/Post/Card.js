import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { dateParser } from "../../utils";
import FollowUser from "../Profil/FollowUser";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUptaded, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const usersData = useSelector((state) => state.users);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    if (usersData) setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={usersData?.users
                ?.map((user) => {
                  if (user._id === post.posterId) return user.picture;
                  else return null;
                })
                .join("")}
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {usersData?.users?.map((user) => {
                    if (user._id === post.posterId) return user.pseudo;
                    else return null;
                  })}
                </h3>
                {post.posterId !== userData?._id && (
                  <span>
                    <FollowUser idToFollow={post.posterId} type="card" />
                  </span>
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {!isUptaded ? (
              <p>{post.message}</p>
            ) : (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}

            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUptaded)}>
                  <img src="./img/icons/edit.svg" alt="edit post" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="edit-comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share post" />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
}

export default Card;
