import { CafePut } from "../services/cafeService";

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

const addItem = (item: CafePut) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

const deleteItem = () => {
  return {
    type: DELETE_ITEM,
  };
};

export { addItem, deleteItem };
