import React from "react";
import CafeService, { CafePost, CafeResponse } from "../../services/cafeService";
import { GridCellParams, GridColDef, GridRowId, GridRowModel } from "@mui/x-data-grid";
import DataTable from "../common.tsx/dataTable";
import { Link } from "react-router-dom";

const Cafes: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [cafes, setCafes] = React.useState<CafeResponse[]>([]);

  React.useEffect(() => {
    onSearch();
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
    },
    {
      field: "employeesCount",
      headerName: "Employees",
      width: 180,
      editable: false,
      renderCell: (params: GridCellParams) => (
        <Link to={`/employees?cafe=${params.row.name}&cafeId=${params.row.id}`}>{params.value as any}</Link>
      ),
    },
    { field: "location", headerName: "Location", width: 180, editable: true },
  ];

  const onRowUpdate = async (row: GridRowModel) => {
    const post: CafePost = {
      name: row.name,
      description: row.description,
      location: row.location,
    };
    if (row.isNew) {
      await CafeService.postCafe(post);
      return { ...row, employeesCount: 0 };
    } else {
      await CafeService.putCafe({ ...post, id: row.id });
      return { ...row };
    }
  };

  const onRowDelete = async (id: GridRowId) => {
    await CafeService.deleteCafe(id.toString());
  };

  const onSearch = (txt?: string) => {
    setLoading(true);
    CafeService.getCafes(txt)
      .then((res) => setCafes(res))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      {loading ? (
        <>Loading...</>
      ) : (
        <DataTable
          rows={cafes}
          colums={columns}
          onRowUpdate={onRowUpdate}
          onRowDelete={onRowDelete}
          searchPlaceHolder={"Search by cafe"}
          onSeach={onSearch}
        />
      )}
    </div>
  );
};

export default Cafes;
