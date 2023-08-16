import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-grid.css";
import React from "react";
import { ColDef } from "ag-grid-community";
import { Button, Grid } from "@mui/material";

export interface AgGridProps {
  rows: any[];
  columns: ColDef[];
  onAddItemClick: () => void;
  onEditClick: (id: any) => void;
  onDeleteClick: (id: any) => Promise<void>;
}
const AgGrid: React.FC<AgGridProps> = (props) => {
  const gridRef = React.useRef<any>(null);
  const { rows, columns, onEditClick, onAddItemClick, onDeleteClick } = props;

  const onClickEdit = (id: any) => {
    onEditClick(id);
  };

  const onAddItemEdit = () => {
    onAddItemClick();
  };

  const onClickDelete = async (id: any) => {
    try {
      await onDeleteClick(id);
      const toRemove = rows.find((r) => r.id === id);
      gridRef.current.api.applyTransaction({ remove: [toRemove] });
    } catch {}
  };

  const getColumns: ColDef[] = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      autoHeight: true,
      cellRendererFramework: (params: any) => {
        return (
          <>
            <Button
              variant="contained"
              style={{ padding: 1, margin: 1, fontSize: 12 }}
              onClick={onClickEdit.bind(null, params.data.id)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="warning"
              style={{ padding: 1, margin: 1, fontSize: 12 }}
              onClick={onClickDelete.bind(null, params.data.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 750, width: "75%" }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          <h2>Cafes - Ag grid</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onAddItemEdit}>
            Add Item
          </Button>
        </Grid>
      </Grid>

      <AgGridReact
        ref={gridRef}
        rowData={rows}
        columnDefs={getColumns}
        animateRows={true}
        pagination={true}
      ></AgGridReact>
    </div>
  );
};

export default AgGrid;
