import React, { useState } from "react";
import "./composeLetter.scss";
import { TextField, Button, IconButton, Autocomplete, Chip } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { users } from "../../data"; // Ensure this contains an array of {email: "..."} objects

const ComposeLetter = ({ isOpen, onClose }) => {
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="composePopup">
      <div className="composeHeader">
        <span>New Request Letter</span>
        <IconButton onClick={onClose}>
          <GridCloseIcon style={{ color: "white" }} />
        </IconButton>
      </div>
      <div className="composeBody">
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          margin="dense"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* Searchable Multi-Select Recipient Field */}
        <Autocomplete
          multiple
          options={users}
          getOptionLabel={(option) => option.email}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              option.email.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          value={recipients}
          onChange={(event, newValue) => setRecipients(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option.email}
                label={option.email}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recipients"
              variant="outlined"
              margin="dense"
              placeholder="Type to search..."
            />
          )}
        />

        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={8}
          margin="dense"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="composeFooter">
        <Button variant="contained" color="primary">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ComposeLetter;
