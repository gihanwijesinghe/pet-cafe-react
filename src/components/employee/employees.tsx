import React from "react";
import { GridCellParams, GridColDef, GridRowId, GridRowModel } from "@mui/x-data-grid";
import DataTable from "../common.tsx/dataTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmployeeService, {
  EmployeeGender,
  EmployeePost,
  EmployeePut,
  EmployeeResponse,
} from "../../services/employeeService";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/employeeAction";

const Employees: React.FC = () => {
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
    } else {
      await EmployeeService.putEmployee({ ...post, id: row.id });
      return { ...row };
    }
  };

  const onRowDelete = async (id: GridRowId) => {
    await EmployeeService.deleteEmployee(id.toString());
  };

  const onRowEditClick = (id: GridRowId) => {
    const employee = employees.find((c) => c.id === id);
    employee && dispatch(addItem(employee as EmployeePut));
    navigate("/employees/create?edit=true");
  };

  return (
    <div className="container">
      {loading ? (
        <>Loading...</>
      ) : (
        <DataTable
          rows={employees}
          colums={columns}
          onRowUpdate={onRowUpdate}
          onRowDelete={onRowDelete}
          onEditNewPage={onRowEditClick}
          addRecordPage={"/employees/create"}
        />
      )}
    </div>
  );
};

export default Employees;
