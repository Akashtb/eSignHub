import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { FaEye } from "react-icons/fa";
import { useDeleteStudentMutation } from "../../features/redux/users/Studentslice";

const DataTable = ({ columns, rows, slug ,setOpenEdit,setOpenView,setSelectedId,refetch}) => {
  
  const [deleteStudent]=useDeleteStudentMutation();

  const handleView = (id) => {
    setSelectedId(id);  
    setOpenView(true);
  };

  const handleEdit = (id)=>{
    setSelectedId(id);  
    setOpenEdit(true);
  }

  const handleDelete = async(id) => {
    switch (slug) {
      case "student":
        await deleteStudent(id).unwrap();
        refetch()
        break;
  
      case "teachers":
        console.log(`Deleting teacher with ID: ${id}`);
        break;
  
      case "courses":
        console.log(`Deleting course with ID: ${id}`);
        break;
  
      default:
        console.warn(`No delete action defined for slug: ${slug}`);
    }
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
            <FaEye size={18} color="#71c9d5" title="View" onClick={() => handleView(params.row._id)}/>
          </div>
          <div onClick={() => handleEdit(params.row._id)}>
            <img src="/view.svg" alt="View" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row._id)}>
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
        getRowId={(row) => row._id}
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
