export interface EmployeeResponse {
  id: string;
  name: string;
  daysWorked: number;
  cafe: string;
  email: string;
  phone: number;
}

export interface EmployeePost {
  name: string;
  email: string;
  phone: number;
  gender: EmployeeGender;
  startDate: Date;
  cafeId?: string;
}

export enum EmployeeGender {
  None = 0,
  Male = 1,
  Female = 2,
}

const EmployeeService = {
  getEmployees: (cafe?: string) => {
    return fetch(`https://localhost:7122/api/employees?cafe=${cafe ?? ""}`)
      .then((res) => res.json())
      .then((res) => res as EmployeeResponse[]);
  },

  postEmployee: (employeePost: EmployeePost) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeePost),
    };

    return fetch("https://localhost:7122/api/employees", requestOptions)
      .then((res) => res.json())
      .then((res) => res as any);
  },
};

export default EmployeeService;
