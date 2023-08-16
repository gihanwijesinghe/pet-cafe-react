import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-grid.css";
import React from "react";
import AgGrid from "../common.tsx/agGrid";
import CafeService, { CafeResponse } from "../../services/cafeService";
import { ColDef } from "ag-grid-community";
import { Link } from "react-router-dom";

const CafesAgGrid: React.FC = () => {
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

  return (
    <div className="container" style={{ fontSize: 20 }}>
      <h2>Cafes - Ag grid</h2>
      {loading ? <>Loading...</> : <AgGrid rows={cafes} columns={columnDefs}></AgGrid>}
    </div>
  );
};

export default CafesAgGrid;
