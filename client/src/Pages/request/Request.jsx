import React, { useState } from "react";
import "./request.scss";
import RequestLetterTable from "../../Components/dataTable/request letter data table/RequestTable";
import { requestLetter } from "../../data";
import ComposeLetter from "../../Components/composeLetter/ComposeLetter";

const columns = [
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
    minWidth: 180,
    renderCell: (params) => (
      <div className="nameContainer">
        <span className="name">{params.value}</span>
        <span className="designation">{params.row.designation}</span>
      </div>
    ),
  },
  {
    field: "subject",
    headerName: "Subject",
    flex: 4,
    minWidth: 300,
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
    headerName: "Department",
    flex: 2,
    minWidth: 200,
    renderCell: (params) => (
      <div className="nameContainer">
        <span className="name">{params.value}</span>
        <span className="designation">{params.row.designation}</span>
      </div>
    ),
  },
];

const RequestLetter = () => {
  const [filter, setFilter] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);



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
        {filteredData.length > 0 ? (
          <RequestLetterTable slug="letter" columns={columns} rows={filteredData} />
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
