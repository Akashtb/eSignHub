import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./requestLetter.scss";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../../features/redux/auth/AuthSlice";

const RequestLetterTable = ({ columns, rows }) => {
  const navigate = useNavigate(); 
  const role = useSelector(selectCurrentRole)
  const pathPrefix = role === "Student" ? "/student" : "/dashboard";

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
          "& .MuiDataGrid-virtualScroller": { overflow: "auto" }, 
        }}
        getRowClassName={() => "custom-row"}
        onRowClick={(params) => navigate(`${pathPrefix}/requestLetter/${params.id}`)} 
      />
    </div>
  );
};

export default RequestLetterTable;
