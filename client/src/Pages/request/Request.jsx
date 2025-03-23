import React, { useState } from "react";
import "./request.scss";
import RequestLetterTable from "../../Components/dataTable/request letter data table/RequestTable";
import { requestLetter } from "../../data";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const columns = [
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
    minWidth: 180,
    renderCell: (params) => {
      return (
        <div className="nameContainer">
          <span className="name">{params.value}</span>
          <span className="designation">{params.row.designation}</span>
        </div>
      );
    },
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
    renderCell: (params) => {
      return (
        <span className={`status ${params.value.toLowerCase()}`}>
          {params.value}
        </span>
      );
    },
  },
  {
    field: "approvedBy",
    headerName: "Department",
    flex: 2,
    minWidth: 200,
    renderCell: (params) => {
      return (
        <div className="nameContainer">
          <span className="name">{params.value}</span>
          <span className="designation">{params.row.designation}</span>
        </div>
      );
    },
  },
];

const RequestLetter = () => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = filter
    ? requestLetter.filter((row) => row.status === filter)
    : requestLetter;

  return (
    <div className="letter">
      <div className="info">
        <h1>Request Letter</h1>
        <button>Add Request Letter</button>
      </div>

      {/* Selection Box
 <div className="filterContainer">
          <FormControl variant="outlined" className="filterSelect">
            <InputLabel>Status</InputLabel>
            <Select value={filter} onChange={handleFilterChange} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Rejected">All</MenuItem>
              <MenuItem value="Pending">Sent</MenuItem>
              <MenuItem value="Approved">Recevied</MenuItem>
            </Select>
          </FormControl>
        </div> */}

      <div className="tableContainer">
       
        {filteredData.length > 0 ? (
          <RequestLetterTable slug="letter" columns={columns} rows={filteredData} />
        ) : (
          <span className="noDataMessage">No Data Available</span>
        )}
      </div>
    </div>
  );
};

export default RequestLetter;
