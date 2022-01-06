import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import { timestampParser } from "../../utils";

function NewPost() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");
  const userData = useSelector((state) => state.user);
  const errors = useSelector((state) => state.errors.postErrors);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) setIsLoading(false);

    const handleVideo = () => {
      let findlink = message.split(" ");

      for (let i = 0; i < findlink.length; i++) {
        if (
          findlink[i].includes("https://www.yout") ||
          findlink[i].includes("https://yout")
        ) {
          let embed = findlink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findlink.splice(i, 1);
          setMessage(findlink.join(" "));
          setPicture("");
        }
      }
    };

    handleVideo();
  }, [userData, message, video]);

  const handleForm = async () => {
    if (message || picture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);
      data.append("video", video);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    }
  };

  const handlePicture = (e) => {
    // pour la gestion partie front
    setPicture(URL.createObjectURL(e.target.files[0]));
    // pour la gestion partie back
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPicture("");
    setVideo("");
    setFile("");
  };

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData?.following?.length}</span> Abonnement
              {userData?.following?.length > 1 && "s"}
            </p>
            <p>
              <span>{userData?.followers?.length}</span> Abonné
              {userData?.followers?.length > 1 && "s"}
            </p>
          </div>
          <NavLink exact="true" to="/profil">
            <div className="user-info">
              <img src={userData?.picture} alt="user-pic" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {(message || video.length > 20 || picture) && (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData?.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData?.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    {picture && <img src={picture} alt="post" />}
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            )}

            <div className="footer-form">
              <div className="icon">
                {!video ? (
                  <>
                    <img src="./img/icons/picture.svg" alt="add" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                ) : (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              {errors?.format && <p>{errors.format}</p>}
              {errors?.maxSize && <p>{errors.maxSize}</p>}
              <div className="btn-send">
                {(message || video.length > 20 || picture) && (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                )}

                <button className="send" onClick={handleForm}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewPost;
