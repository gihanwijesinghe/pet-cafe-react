import { baseUrl } from "./baseService";

export interface EmployeeResponse extends EmployeePost {
  id: string;
  daysWorked: number;
  cafe: string;
}

export interface EmployeePost {
  name: string;
  email: string;
  phone: number;
  gender: EmployeeGender;
  startDate: Date;
  cafeId?: string;
}

export interface EmployeePut extends EmployeePost {
  id: string;
}

export enum EmployeeGender {
  None = 0,
  Male = 1,
  Female = 2,
}

const employeeUrl = baseUrl + "employees";
const EmployeeService = {
  getEmployees: (cafe?: string) => {
    return fetch(`${employeeUrl}?cafe=${cafe ?? ""}`)
      .then((res) => res.json())
      .then((res) => res as EmployeeResponse[]);
  },

  postEmployee: (employeePost: EmployeePost) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeePost),
    };

    return fetch(employeeUrl, requestOptions)
      .then((res) => res.json())
      .then((res) => res as any);
  },

  putEmployee: (employeePut: EmployeePut) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeePut),
    };

    return fetch(`${employeeUrl}/${employeePut.id}`, requestOptions);
  },

  deleteEmployee: (id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(`${employeeUrl}/${id}`, requestOptions);
  },
};

export default EmployeeService;
