import { CafePut } from "../services/cafeService";
import { ADD_ITEM, DELETE_ITEM } from "./cafeAction";

export interface ReduxAction {
  type: string;
  payload: CafePut;
}

const initialState = {
  cafePut: {},
};

const CafeReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        cafePut: action.payload,
      };

    case DELETE_ITEM:
      return {
        ...state,
        cafePut: {},
      };
    default:
      return state;
  }
};

export default CafeReducer;
