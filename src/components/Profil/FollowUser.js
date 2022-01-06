import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";

function FollowUser({ idToFollow, type }) {
  const userData = useSelector((state) => state.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData?._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData?._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (userData?.following?.includes(idToFollow)) {
      setIsFollowed(true);
    } else setIsFollowed(false);
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed ? (
        <>
          {type === "suggestion" && (
            <button className="unfollow-btn" onClick={handleUnfollow}>
              Abonné
            </button>
          )}
          {type === "card" && (
            <img
              src="./img/icons/checked.svg"
              alt="checked"
              onClick={handleUnfollow}
            />
          )}
        </>
      ) : (
        <>
          {type === "suggestion" && (
            <button className="unfollow-btn" onClick={handleFollow}>
              Suivre
            </button>
          )}
          {type === "card" && (
            <img
              src="./img/icons/check.svg"
              alt="check"
              onClick={handleFollow}
            />
          )}
        </>
      )}
    </>
  );
}

export default FollowUser;
