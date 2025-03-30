import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./requestLetter.scss";

const RequestLetterTable = ({ columns, rows }) => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        autoHeight
        rows={rows}
        getRowId={(row) => row._id}
        columns={[...columns]}
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
        hideFooter={false}
        sx={{
          "& .MuiDataGrid-columnHeaders": { display: "none" },
        }}
        getRowClassName={() => "custom-row"}
        onRowClick={(params) => navigate(`/requestLetter/${params.id}`)} 
      />
    </div>
  );
};

export default RequestLetterTable;
