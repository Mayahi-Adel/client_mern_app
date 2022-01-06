import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../../utils";
import FollowUser from "./FollowUser";

function UpdateProfil() {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const userData = useSelector((state) => state.user);
  const usersData = useSelector((state) => state.users);
  const errors = useSelector((state) => state.errors.userErrors);
  //console.log(userData);

  const dispatch = useDispatch();

  const handleUpdateBio = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <>
      <LeftNav active="profil" />
      <div className="profil__title">
        <h1>Profil de {userData?.pseudo}</h1>
      </div>
      <div className="profil__contain">
        <div>
          <div className="update-container">
            <div className="left-part">
              <h3>Photo de profil</h3>
              <img src={userData?.picture} alt="user-pic" />
              <UploadImg />
              <p>{errors?.maxSize}</p>
              <p>{errors?.format}</p>
            </div>
          </div>
        </div>

        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>

            {updateForm ? (
              <>
                <textarea
                  defaultValue={userData?.bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <button onClick={handleUpdateBio}>Valider Modifications</button>
              </>
            ) : (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {userData?.bio}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData?.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements : {userData?.following?.length}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData?.followers?.length}
          </h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData?.users?.map((user) => {
                for (let i = 0; i < userData?.following?.length; i++) {
                  if (user._id === userData?.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user?.picture} alt="user-pic" />
                        <h4>{user?.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowUser
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Followers popup */}

      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData?.users.map((user) => {
                for (let i = 0; i < userData?.followers.length; i++) {
                  if (user._id === userData?.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user?.picture} alt="user-pic" />
                        <h4>{user?.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowUser idToFollow={user._id} type="suggestion" />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProfil;
