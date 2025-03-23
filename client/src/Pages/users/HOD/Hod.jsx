import DataTable from "../../../components/dataTable/DataTable";
import "./hod.scss";
import { useState } from "react";
import Add from "../../../components/add/Add";
import { userRows } from "../../../data";
import Edit from "../../../Components/Edit/Edit";
import View from "../../../Components/View/View";

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


const HOD = () => {
  const [open, setOpen] = useState(false);
  const [openEdit,setOpenEdit] = useState(false)
  const [openView,setOpenView] = useState(false)

  return (
    <div className="HOD">
      <div className="info">
        <h1>HOD</h1>
        <button onClick={() => setOpen(true)}>Add New HOD</button>
      </div>
      <div className="tableContainer">
        <DataTable slug="HOD" columns={columns} rows={userRows} setOpenEdit={setOpenEdit} setOpenView={setOpenView}/>
      </div>
      {open && <Add slug="HOD" columns={columns} setOpen={setOpen} />}
      {openEdit && <Edit slug="HOD" columns={columns} setOpenEdit={setOpenEdit} />}
      {openView && <View slug="HOD" columns={columns} setOpenView={setOpenView} />}
    </div>
  );
};

export default HOD;
