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

  putEmployee: (employeePut: EmployeePut) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeePut),
    };

    return fetch(`https://localhost:7122/api/employees/${employeePut.id}`, requestOptions);
  },

  deleteEmployee: (id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(`https://localhost:7122/api/employees/${id}`, requestOptions);
  },
};

export default EmployeeService;
