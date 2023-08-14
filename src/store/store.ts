import { combineReducers, createStore } from "redux";
import CafeReducer from "./cafeReducer";
import EmployeeReducer from "./employeeReducer";

const rootReducer = combineReducers({
  CafeReducer,
  EmployeeReducer,
});
const store = createStore(rootReducer);

export default store;
