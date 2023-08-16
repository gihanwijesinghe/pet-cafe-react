import React from "react";
import AgGrid from "../common.tsx/agGrid";
import { ColDef } from "ag-grid-community";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import EmployeeService, { EmployeeResponse } from "../../services/employeeService";
import { addItem } from "../../store/employeeAction";

const EmployeesAgGrid: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cafe = searchParams.get("cafe");
  const cafeId = searchParams.get("cafeId");

  const [loading, setLoading] = React.useState<boolean>(true);
  const [employees, setEmployees] = React.useState<EmployeeResponse[]>([]);

  React.useEffect(() => {
    setLoading(true);
    EmployeeService.getEmployees(cafe ?? undefined)
      .then((res) => setEmployees(res))
      .finally(() => setLoading(false));
  }, [cafe]);

  const columnDefs: ColDef[] = [
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phone" },
    { field: "daysWorked" },
    { field: "cafe" },
  ];

  const onEditClick = (id: string) => {
    const employee = employees.find((c) => c.id === id);
    employee && dispatch(addItem(employee));
    navigate("/employees/create?edit=true");
  };

  const onAddItemClick = () => {
    navigate("/employees/create");
  };

  const onDeleteClick = async (id: string) => {
    await EmployeeService.deleteEmployee(id.toString());
  };

  return (
    <div className="container" style={{ fontSize: 20 }}>
      {loading ? (
        <>Loading...</>
      ) : (
        <AgGrid
          rows={employees}
          title="Employees - Ag grid"
          columns={columnDefs}
          onEditClick={onEditClick}
          onAddItemClick={onAddItemClick}
          onDeleteClick={onDeleteClick}
        ></AgGrid>
      )}
    </div>
  );
};

export default EmployeesAgGrid;
