import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./requestLetter.scss";

const RequestLetterTable = ({ columns, rows}) => {



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
      />
    </div>
  );
};

export default RequestLetterTable;
