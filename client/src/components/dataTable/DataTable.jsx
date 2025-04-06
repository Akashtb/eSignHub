import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { FaEye } from "react-icons/fa";
import { useDeleteStudentMutation } from "../../features/redux/users/Studentslice";
import { useDeleteTutorMutation } from "../../features/redux/users/TutorSlice";
import { useDeleteHODMutation } from "../../features/redux/users/HODSlice";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../features/redux/auth/AuthSlice";
import { toast } from "react-toastify";


const DataTable = ({ columns, rows, slug, setOpenEdit, setOpenView, setSelectedId, refetch ,isLoading}) => {

  const [deleteStudent] = useDeleteStudentMutation();
  const [deleteTutor] = useDeleteTutorMutation();
  const [deleteHOD] = useDeleteHODMutation();

  const user = useSelector(selectCurrentRole)

  const handleView = (id) => {
    setSelectedId(id);
    setOpenView(true);
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setOpenEdit(true);
  }

  const handleDelete = async (id) => {
    try {
      switch (slug) {
        case "student":
          await deleteStudent(id).unwrap();
          toast.success("Student deleted successfully");
          break;
  
        case "Tutor":
          await deleteTutor(id).unwrap();
          toast.success("Tutor deleted successfully");
          break;
  
        case "HOD":
          await deleteHOD(id).unwrap();
          toast.success("HOD deleted successfully");
          break;
  
        default:
          toast.error("Invalid role type for delete operation");
          return;
      }
  
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete. Please try again.");
    }
  };
  


  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 120,
    sortable: false,
    renderCell: (params) => {
      const isStudentSlug = slug === "student";
      const canEditDelete =
        user === "Principal" || (isStudentSlug && (user === "HOD" || user === "Tutor"));
  
      return (
        <div className="action">
          <div style={{ cursor: "pointer" }}>
            <FaEye size={18} color="#71c9d5" title="View" onClick={() => handleView(params.row._id)} />
          </div>
  
          {canEditDelete && (
            <>
              <div onClick={() => handleEdit(params.row._id)}>
                <img src="/view.svg" alt="Edit" title="Edit" />
              </div>
              <div className="delete" onClick={() => handleDelete(params.row._id)}>
                <img src="/delete.svg" alt="Delete" title="Delete" />
              </div>
            </>
          )}
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
