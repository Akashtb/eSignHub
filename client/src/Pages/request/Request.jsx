import React, { useEffect, useState } from "react";
import "./request.scss";
import RequestLetterTable from "../../Components/dataTable/request letter data table/RequestTable";
import { requestLetter } from "../../data";
import ComposeLetter from "../../Components/composeLetter/ComposeLetter";
import { useGetAllRequestLetterQuery } from "../../features/redux/users/RequestLetter";
import { selectCurrentUser } from "../../features/redux/auth/AuthSlice";
import { useSelector } from "react-redux";

const columns = [
  {
    field: "fromUid",
    headerName: "Name",
    flex: 1,
    minWidth: 180,
    renderCell: (params) => {
      const { firstName, lastName } = params.value || {};
      return (
        <div className="nameContainer">
          <span className="name">{firstName} {lastName}</span>
          <span className="designation">Student</span>
        </div>
      );
    },
  },
  {
    field: "subject",
    headerName: "Subject",
    flex: 4,
    minWidth: 300,
    renderCell: (params) => {
      const seenByArray = params.row.seenBy || []; 
      const isSeen = seenByArray.some((seenUser) => seenUser._id === user._id); 

      return (
        <span style={{ fontWeight: isSeen ? "normal" : "bold" }}>
          {params.value}
        </span>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <span className={`status ${params.value.toLowerCase()}`}>
        {params.value}
      </span>
    ),
  },
  {
    field: "approvedBy",
    headerName: "Approved By",
    flex: 2,
    minWidth: 200,
    renderCell: (params) => {
      if (!params.value) return <span>Not Approved</span>;
      const { name, role } = params.value;
      return (
        <div className="nameContainer">
          <span className="name">{name}</span>
          <span className="designation">{role}</span>
        </div>
      );
    },
  },
];

const RequestLetter = () => {
  const [filter, setFilter] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useGetAllRequestLetterQuery()
  const user = useSelector(selectCurrentUser);
  console.log(user);
  

  console.log(data,"request data");
  
  useEffect(()=>{
    refetch()
  },[])


  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
  };

  const filteredData = filter
    ? requestLetter.filter((row) => row.status === filter)
    : requestLetter;

  return (
    <div className="letter">
      <div className="info">
        <h1>Request Letter</h1>
        <button onClick={handleComposeClick}>Add Request Letter</button>
      </div>

      <div className="tableContainer">
        {data?.length > 0 ? (
          <RequestLetterTable slug="letter" columns={columns} rows={data} />
        ) : (
          <span className="noDataMessage">No Data Available</span>
        )}
      </div>

      {/* Imported Compose Popup */}
      <ComposeLetter isOpen={isComposeOpen} onClose={handleCloseCompose} />
    </div>
  );
};

export default RequestLetter;
