import DataTable from "../../../components/dataTable/DataTable";
import "./hod.scss";
import { useEffect, useState } from "react";
import Add from "../../../components/add/Add";
import { userRows } from "../../../data";
import Edit from "../../../Components/Edit/Edit";
import View from "../../../Components/View/View";
import { useGetAllHODQuery } from "../../../features/redux/users/HODSlice";




const HOD = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const { data: HOD, isLoading, isError, refetch } = useGetAllHODQuery()
  const HODData = HOD

  useEffect(() => {
    refetch()
  }, [])

  const columns = [
    {
      field: "img",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="avatar" />;
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1.5,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1.5,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2.5,
      minWidth: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1.5,
      minWidth: 150,
    },
    {
      field: "password",
      headerName: "password",
      flex: 1.5,
      minWidth: 150,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1.5,
      minWidth: 150,
    },
    {
      field: "departmentName",
      headerName: "Department",
      flex: 2,
      minWidth: 200,
    },
  ];

  const filteredColumns = columns.filter(col => col.field !== "password");

  return (
    <div className="HOD">
      <div className="info">
        <h1>HOD</h1>
        <button onClick={() => setOpen(true)}>Add New HOD</button>
      </div>
      <div className="tableContainer">
        <DataTable slug="HOD" columns={filteredColumns} rows={HODData} setOpenEdit={setOpenEdit} setOpenView={setOpenView} setSelectedId={setSelectedId} refetch={refetch} />
      </div>
      {open && <Add slug="HOD" columns={columns} setOpen={setOpen} refetch={refetch}/>}
      {openEdit && <Edit slug="HOD" columns={filteredColumns} setOpenEdit={setOpenEdit} refetch={refetch} selectedId={selectedId}/>}
      {openView && <View slug="HOD" columns={filteredColumns} setOpenView={setOpenView} selectedId={selectedId}/>}
    </div>
  );
};

export default HOD;
