
import DataTable from '../../components/dataTable/DataTable'
import Add from '../../components/add/Add'
import { userRows } from "../../data";
import { useState } from 'react';
import "./request.scss";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
  },
];
const Request = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className="requests">
    <div className="info">
      <h1>Request</h1>
      <button onClick={() => setOpen(true)}>Compose Letter</button>
    </div>
    <DataTable slug="users" columns={columns} rows={userRows} />
    {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
  </div>
  )
}

export default Request