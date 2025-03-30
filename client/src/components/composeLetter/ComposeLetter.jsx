import React, { useState, useEffect } from "react";
import "./composeLetter.scss";
import { TextField, Button, IconButton, Autocomplete, Chip, CircularProgress } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useCreateRequestLetterMutation, useRecipientListQuery } from "../../features/redux/users/RequestLetter";

const ComposeLetter = ({ isOpen, onClose, refetchRequestLetter }) => {
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  

  const { data: RecipientList, isLoading, isError,error, refetch } = useRecipientListQuery();
  const [createRequestLetter, { isLoading: isSubmitting, isSuccess, isError: submitError,error:createRequestError }] = useCreateRequestLetterMutation();

  useEffect(() => {
    refetch();
  }, []);

  if(submitError){
    console.log(createRequestError);
  }
  if (isError) {
    console.error("Error fetching recipient list:", error);
  }


  console.log(RecipientList, "recipients list");
  console.log(subject, "subject");
  console.log(message, "message");

  const handleSend = async () => {
    if (!subject || !message || recipients.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const toUids = recipients.map(({ _id, role }) => ({ userId: _id, role })); // Convert recipients to user IDs
    console.log(toUids,"toUids");
    

    try {
      await createRequestLetter({
        subject,
        messageBody: message,
        toUids,
      }).unwrap();

      alert("Letter sent successfully!");
      setRecipients([]);
      setSubject("");
      setMessage("");
      refetchRequestLetter()
      onClose(); // Close popup after sending
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send letter.");
    }
  };


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

        <Autocomplete
          multiple
          options={RecipientList?.recipients || []}
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
              <Chip key={option.email} label={option.email} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recipients"
              variant="outlined"
              margin="dense"
              placeholder="Type to search..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
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
        <Button variant="contained" color="primary" onClick={handleSend} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default ComposeLetter;
