import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Search from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Link } from "react-router-dom";
import { Grid, IconButton, Input, InputBase } from "@mui/material";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps, searchPlaceholder?: string, onSearch?: (s: string) => void) {
  const { setRows, setRowModesModel } = props;
  const [txt, setTxt] = React.useState<string>("");

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  const onSearchClick = () => {
    onSearch && onSearch(txt);
  };

  return (
    <GridToolbarContainer>
      <Grid container justifyContent={"space-between"}>
        <Grid item>
          <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record inline
          </Button>
          <Button color="primary" startIcon={<AddIcon />}>
            <Link to={`/cafes/create`}>Add record from page</Link>
          </Button>
        </Grid>
        {onSearch && (
          <Grid item>
            <Input placeholder={searchPlaceholder ?? "Search"} onChange={(e) => setTxt(e.target.value)} />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={onSearchClick}>
              <Search />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </GridToolbarContainer>
  );
}

export interface DataTableProps {
  rows: GridRowsProp;
  colums: GridColDef[];
  onRowUpdate?: (row: GridRowModel) => Promise<any>;
  onRowDelete?: (row: GridRowId) => Promise<void>;
  searchPlaceHolder?: string;
  onSeach?: (searchText?: string) => void;
}

const DataTable: React.FC<DataTableProps> = (props) => {
  const [rows, setRows] = React.useState(props.rows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    props.onRowDelete && (await props.onRowDelete(id));
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const fittedRow = props.onRowUpdate && (await props.onRowUpdate(newRow));

    const updatedRow = { ...fittedRow, isNew: false };

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getColumns = (): GridColDef[] => {
    return [
      ...props.colums,
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  };

  return (
    <DataGrid
      rows={rows}
      columns={getColumns()}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: (p: EditToolbarProps) => EditToolbar(p, props.searchPlaceHolder, props.onSeach),
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
    />
  );
};

export default DataTable;
