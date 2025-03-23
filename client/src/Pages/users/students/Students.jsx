import DataTable from "../../../components/dataTable/DataTable";
import "./students.scss";
import { useState } from "react";
import Add from "../../../components/add/Add";
import { userRows } from "../../../data";
import Edit from "../../../Components/Edit/Edit";

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
    field: "regNumber",
    headerName: "Registration Number",
    flex: 1.5,
    minWidth: 160,
  },
  {
    field: "batch",
    headerName: "Batch",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "departmentName",
    headerName: "Department",
    flex: 2,
    minWidth: 200, 
  },
];


const Students = () => {
  const [open, setOpen] = useState(false);
  const [openEdit,setOpenEdit] = useState(false)

  return (
    <div className="students">
      <div className="info">
        <h1>Student</h1>
        <button onClick={() => setOpen(true)}>Add New Student</button>
      </div>
      <div className="tableContainer">
        <DataTable slug="student" columns={columns} rows={userRows} setOpenEdit={setOpenEdit} />
      </div>
      {open && <Add slug="student" columns={columns} setOpen={setOpen} />}
      {openEdit && <Edit slug="student" columns={columns} setOpenEdit={setOpenEdit} />}
    </div>
  );
};

export default Students;
