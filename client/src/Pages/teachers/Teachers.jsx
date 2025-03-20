import { useState } from "react";
import "./teachers.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { products } from "../../data";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
  },
];

const Teachers = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Teachers;