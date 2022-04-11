import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import momentReducer from "./moment/momentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  moment: momentReducer,
});

export default rootReducer;
