import * as actions from "./momentTypes";

const initialMomentState = {
  loading: true,
  moment: [],
  err: "",
};

const momentReducer = (state = initialMomentState, action) => {
  switch (action.type) {
    case actions.MOMENT_GET_REQUEST:
      return { ...state, loading: true };
    case actions.MOMENT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        moment: action.payload,
        err: "",
      };
    case actions.MOMENT_GET_FAILURE:
      return {
        ...state,
        loading: false,
        moment: [],
        err: action.payload,
      };
    default:
      return state;
  }
};

export default momentReducer;
