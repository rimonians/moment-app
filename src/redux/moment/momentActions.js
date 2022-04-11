import * as actions from "./momentTypes";
import { colRef } from "../../firebase/firebase.moment";
import { onSnapshot, query, where, orderBy } from "firebase/firestore";

export const momentGetRequest = () => {
  return {
    type: actions.MOMENT_GET_REQUEST,
  };
};

export const momentGetSuccess = (payload) => {
  return {
    type: actions.MOMENT_GET_SUCCESS,
    payload,
  };
};

export const momentGetFailure = () => {
  return {
    type: actions.MOMENT_GET_FAILURE,
  };
};

// Moment get initiate functionality
export const momentGetInitiate = (uid) => {
  return (dispatch) => {
    const q = query(colRef, where("userId", "==", uid), orderBy("createAt"));
    dispatch(momentGetRequest());
    onSnapshot(q, (snapshot) => {
      const moment = [];
      snapshot.docs.map((item) => {
        return moment.push({ ...item.data(), id: item.id });
      });
      dispatch(momentGetSuccess(moment));
    });
  };
};
