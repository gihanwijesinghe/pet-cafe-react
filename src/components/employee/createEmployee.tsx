import React from "react";
import CafeService, { CafePost, CafePut, CafeResponse } from "../../services/cafeService";
import { GridCellParams, GridColDef, GridRowId, GridRowModel } from "@mui/x-data-grid";
import DataTable from "../common.tsx/dataTable";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cafeAction";

const Cafes: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onRowEditClick = (id: GridRowId) => {
    const cafe = cafes.find((c) => c.id === id);
    cafe && dispatch(addItem(cafe as CafePut));
    navigate("/cafes/create?edit=true");
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
          onEditNewPage={onRowEditClick}
          addRecordPage={"/cafes/create"}
        />
      )}
    </div>
  );
};

export default Cafes;
