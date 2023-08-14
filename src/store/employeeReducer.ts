import { ADD_ITEM, DELETE_ITEM } from "./cafeAction";
import { ReduxAction } from "./cafeReducer";

const initialState = {
  employeeResponse: {},
};

const EmployeeReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        employeeResponse: action.payload,
      };

    case DELETE_ITEM:
      return {
        ...state,
        employeeResponse: {},
      };
    default:
      return state;
  }
};

export default EmployeeReducer;
