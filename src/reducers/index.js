import profileReducer from "./profileReducer";
import language from "./language";
import tripReducer from "./trip";
import { combineReducers } from "redux";
import mapReducer from "./map";
import userReducer from "./user";

const allReducers = combineReducers({
  profile: profileReducer,
  language,
  trip: tripReducer,
  map: mapReducer,
  user:userReducer
});

export default allReducers;
