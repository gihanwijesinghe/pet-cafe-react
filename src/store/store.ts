import { createStore } from "redux";
import CafeReducer from "./cafeReducer";

const store = createStore(CafeReducer);

export default store;
