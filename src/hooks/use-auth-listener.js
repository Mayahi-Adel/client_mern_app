import { useState, useEffect } from "react";
import { userListener } from "../services";
import { useDispatch } from "react-redux";

import { getUser } from "../actions/user.actions";

export default function useAuthListener() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = async () => {
      try {
        const response = await userListener();
        setUid(response.data);
      } catch (err) {
        console.log("No Token");
      }
    };

    listener();
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return uid;
}
