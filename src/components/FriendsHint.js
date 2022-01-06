import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import { isEmpty } from "../utils";
import FollowUser from "./Profil/FollowUser";

function FriendsHint() {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.user);
  const usersData = useSelector((state) => state.users?.users);

  //   console.log("user", userData);
  //   console.log("USERS", usersData);

  useEffect(() => {
    const notFriendList = () => {
      let list = [];
      usersData.map((user) => {
        if (
          user._id !== userData?._id &&
          !user?.followers?.includes(userData._id)
        ) {
          return list.push(user._id);
        } else return null;
      });

      list.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        list.length = 5;
      } else if (window.innerHeight > 720) {
        list.length = 4;
      } else if (window.innerHeight > 615) {
        list.length = 2;
      } else {
        list.length = 1;
      }
      setFriendsHint(list);
    };

    if (playOnce && usersData) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowUser
                        idToFollow={usersData[i]._id}
                        type="suggestion"
                      />
                    </li>
                  );
                }
              }
              return null;
            })}
        </ul>
      )}
    </div>
  );
}

export default FriendsHint;
