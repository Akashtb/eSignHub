import React, { useEffect, useState } from "react";
import "./request.scss";
import RequestLetterTable from "../../Components/dataTable/request letter data table/RequestTable";
import ComposeLetter from "../../Components/composeLetter/ComposeLetter";
import { useGetAllRequestLetterQuery } from "../../features/redux/users/RequestLetter";
import { selectCurrentRole, selectCurrentUser } from "../../features/redux/auth/AuthSlice";
import { useSelector } from "react-redux";

const RequestLetter = () => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const { data, isLoading, isError, refetch: refetchRequestLetter } = useGetAllRequestLetterQuery();
  console.log(data);
  
  const role = useSelector(selectCurrentRole);
  const user = useSelector(selectCurrentUser); 
  console.log(user,"user");
  

  useEffect(() => {
    if (!data) {
      refetchRequestLetter();
    }
  }, [data, refetchRequestLetter,user]); 

  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
  };

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
        const isSeen = seenByArray.some((seenUser) => seenUser._id === user); 

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

        const { firstName, lastName, role } = params.value.userId;
        return (
          <div className="nameContainer">
            <span className="name">{firstName} {lastName}</span>
            <span className="designation">{role}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="letter">
      <div className="info">
        <h1>Request Letter</h1>
        {role === "Student" && <button onClick={handleComposeClick}>Add Request Letter</button>}
      </div>

      <div className="tableContainer">
        {data?.length > 0 ? (
          <RequestLetterTable slug="letter" columns={columns} rows={data} />
        ) : (
          <span className="noDataMessage">No Data Available</span>
        )}
      </div>

      {/* Compose Popup */}
      {role === "Student" && <ComposeLetter isOpen={isComposeOpen} onClose={handleCloseCompose} refetchRequestLetter={refetchRequestLetter} />}
    </div>
  );
};

export default RequestLetter;
