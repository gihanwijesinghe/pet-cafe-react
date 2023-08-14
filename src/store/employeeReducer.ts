import { ADD_ITEM, DELETE_ITEM } from "./cafeAction";
import { ReduxAction } from "./cafeReducer";

const initialState = {
  employeePut: {},
};

const EmployeeReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        employeePut: action.payload,
      };

    case DELETE_ITEM:
      return {
        ...state,
        employeePut: {},
      };
    default:
      return state;
  }
};

export default EmployeeReducer;
