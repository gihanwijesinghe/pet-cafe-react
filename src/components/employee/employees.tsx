import React from "react";
import { GridCellParams, GridColDef, GridRowModel } from "@mui/x-data-grid";
import DataTable from "../common.tsx/dataTable";
import { useSearchParams } from "react-router-dom";
import EmployeeService, { EmployeeGender, EmployeePost, EmployeeResponse } from "../../services/employeeService";

const Employees: React.FC = () => {
  const [searchParams] = useSearchParams();
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 180,
      editable: false,
      renderCell: (params: GridCellParams) => <>{params.row.isNew ? "" : params.value}</>,
    },
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 180,
      editable: true,
    },
    {
      field: "daysWorked",
      headerName: "Days worked",
      width: 180,
      editable: false,
    },
    {
      field: "cafe",
      headerName: "Cafe",
      width: 180,
      editable: false,
    },
  ];

  const onRowUpdate = async (row: GridRowModel) => {
    const post: EmployeePost = {
      name: row.name,
      email: row.email,
      phone: row.phone,
      gender: EmployeeGender.None,
      startDate: new Date(),
      cafeId: cafeId ?? undefined,
    };
    if (row.isNew) {
      const emp = await EmployeeService.postEmployee(post);
      return { ...row, id: emp.id, daysWorked: 1, cafe: cafe };
    }
  };

  return (
    <div className="container">
      {loading ? <>Loading...</> : <DataTable rows={employees} colums={columns} onRowUpdate={onRowUpdate} />}
    </div>
  );
};

export default Employees;
