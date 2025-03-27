import "./tutor.scss";
import { useEffect, useState } from "react";
import Add from "../../../components/add/Add";
import { userRows } from "../../../data";
import Edit from "../../../Components/Edit/Edit";
import View from "../../../Components/View/View";
import DataTable from "../../../components/dataTable/DataTable";
import { useGetAllTutorsQuery } from "../../../features/redux/users/TutorSlice";

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


const Tutor = () => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const { data:tutor, isLoading, isError, refetch } = useGetAllTutorsQuery()
    const tutorData = tutor?.tutors;


    // useEffect(() => {
    //     console.log("Data:", data);
    //     console.log("Loading:", isLoading);
    //     console.log("Error:", isError);
    // }, [data, isLoading, isError]);

    useEffect(()=>{
        refetch()
    },[])

    console.log("selectedId",selectedId);
    

    return (
        <div className="Tutor">
            <div className="info">
                <h1>Tutor</h1>
                <button onClick={() => setOpen(true)}>Add New Tutor</button>
            </div>
            <div className="tableContainer">
                <DataTable slug="Tutor" columns={columns} rows={tutorData} setOpenEdit={setOpenEdit} setOpenView={setOpenView} setSelectedId={setSelectedId} refetch={refetch} />
            </div>
            {open && <Add slug="Tutor" columns={columns} setOpen={setOpen} refetch={refetch} />}
            {openEdit && <Edit slug="Tutor" columns={columns} setOpenEdit={setOpenEdit} refetch={refetch} selectedId={selectedId} />}
            {openView && <View slug="HOD" columns={columns} setOpenView={setOpenView} selectedId={selectedId}/>}
        </div>
    );
};

export default Tutor;
