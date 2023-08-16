import React from "react";
import AgGrid from "../common.tsx/agGrid";
import CafeService, { CafePut, CafeResponse } from "../../services/cafeService";
import { ColDef } from "ag-grid-community";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cafeAction";

const CafesAgGrid: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [cafes, setCafes] = React.useState<CafeResponse[]>([]);

  React.useEffect(() => {
    onSearch();
  }, []);

  const onSearch = (txt?: string) => {
    setLoading(true);
    CafeService.getCafes(txt)
      .then((res) => setCafes(res))
      .finally(() => setLoading(false));
  };

  const columnDefs: ColDef[] = [
    { field: "name", headerName: "Name" },
    { field: "description" },
    {
      field: "employeesCount",
      headerName: "Employees",
      cellRendererFramework: (params: any) => {
        return <Link to={`/employees?cafe=${params.data.name}&cafeId=${params.data.id}`}>{params.value as any}</Link>;
      },
    },
    { field: "location", filter: true },
  ];

  const onEditClick = (id: string) => {
    const cafe = cafes.find((c) => c.id === id);
    cafe && dispatch(addItem(cafe as CafePut));
    navigate("/cafes/create?edit=true");
  };

  const onAddItemClick = () => {
    navigate("/cafes/create");
  };

  const onDeleteClick = async (id: string) => {
    await CafeService.deleteCafe(id.toString());
  };

  return (
    <div className="container" style={{ fontSize: 20 }}>
      {loading ? (
        <>Loading...</>
      ) : (
        <AgGrid
          rows={cafes}
          columns={columnDefs}
          onEditClick={onEditClick}
          onAddItemClick={onAddItemClick}
          onDeleteClick={onDeleteClick}
        ></AgGrid>
      )}
    </div>
  );
};

export default CafesAgGrid;
