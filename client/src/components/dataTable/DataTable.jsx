import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { FaEye } from "react-icons/fa";

const DataTable = ({ columns, rows, slug ,setOpenEdit,setOpenView}) => {
  const handleDelete = (id) => {
    console.log("Delete ID:", id);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 120,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="action">
          <div style={{ cursor: "pointer" }}>
            <FaEye size={18} color="#71c9d5" title="View" onClick={() => setOpenView(true)}/>
          </div>
          <div onClick={() => setOpenEdit(true)}>
            <img src="/view.svg" alt="View" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="Delete" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        autoHeight
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
