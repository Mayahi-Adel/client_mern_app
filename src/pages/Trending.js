import React, { useContext } from "react";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import UserContext from "../context/appContext";
import { isEmpty } from "../utils";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/FriendsHint";

function Trending() {
  const uid = useContext(UserContext);
  const trendList = useSelector((state) => state.trends);

  return (
    <>
      <div className="trending-page">
        <LeftNav active="trending" />
        <div className="main">
          <ul>
            {!isEmpty(trendList[0]) &&
              trendList.map((post) => <Card post={post} key={post._id} />)}
          </ul>
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Trending;
