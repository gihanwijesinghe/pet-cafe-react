import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-grid.css";
import React, { useCallback } from "react";
import { CellClickedEvent, ColDef } from "ag-grid-community";

export interface AgGridProps {
  rows: any[];
  columns: ColDef[];
}
const AgGrid: React.FC<AgGridProps> = (props) => {
  const { rows, columns } = props;

  const cellClickedListener = useCallback((e: CellClickedEvent<HTMLButtonElement>) => {
    console.log("cellClickedListener", e);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 750, width: "75%" }}>
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        animateRows={true}
        pagination={true}
        onCellClicked={cellClickedListener}
      ></AgGridReact>
    </div>
  );
};

export default AgGrid;
