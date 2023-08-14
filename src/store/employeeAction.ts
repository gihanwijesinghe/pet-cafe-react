import { EmployeePut, EmployeeResponse } from "../services/employeeService";

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

const addItem = (item: EmployeeResponse) => {
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
