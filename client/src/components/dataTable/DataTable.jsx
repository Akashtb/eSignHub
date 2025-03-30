import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { FaEye } from "react-icons/fa";
import { useDeleteStudentMutation } from "../../features/redux/users/Studentslice";
import { useDeleteTutorMutation } from "../../features/redux/users/TutorSlice";
import { useDeleteHODMutation } from "../../features/redux/users/HODSlice";

const DataTable = ({ columns, rows, slug, setOpenEdit, setOpenView, setSelectedId, refetch }) => {

  const [deleteStudent] = useDeleteStudentMutation();
  const [deleteTutor] = useDeleteTutorMutation();
  const [deleteHOD] = useDeleteHODMutation();

  const handleView = (id) => {
    setSelectedId(id);
    setOpenView(true);
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setOpenEdit(true);
  }

  const handleDelete = async (id) => {
    switch (slug) {
      case "student":
        await deleteStudent(id).unwrap();
        refetch()
        break;

      case "Tutor":
        await deleteTutor(id).unwrap()
        refetch()
        break;

      case "HOD":
        await deleteHOD(id).unwrap()
        refetch()
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
            <FaEye size={18} color="#71c9d5" title="View" onClick={() => handleView(params.row._id)} />
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
