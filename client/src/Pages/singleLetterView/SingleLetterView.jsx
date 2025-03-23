import React from "react";
import "./SingleLetterView.scss";
import { Button, Card, CardContent, Typography, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { requestLetter } from "../../data";
import { FaArrowLeft, FaCheckCircle, FaReply, FaTimesCircle } from "react-icons/fa";

const SingleLetterView = () => {
    const { id } = useParams();
    const letter = requestLetter.find((item) => item.id === parseInt(id));

    if (!letter) {
        return <div className="notFound">Letter not found!</div>;
    }

    return (
        <div className="gmailLetterPage">
            <Card className="gmailLetterCard">
                <CardContent>
                    <div className="headerSection">
                        <FaArrowLeft className="backIcon" />
                        <Typography variant="h5" className="letterTitle">
                            {letter.subject}
                            <Chip label={letter.status} className={`statusChip ${letter.status.toLowerCase()}`} />
                        </Typography>
                    </div>

                    <div className="senderDetails">
                        <Typography variant="subtitle1">
                            <strong>From:</strong> {letter.sender}
                        </Typography>
                        <Typography variant="subtitle1" className="recipient">
                            <strong>To:</strong> {letter.recipient}
                        </Typography>
                        <Typography variant="caption" className="date">
                            {letter.date}
                        </Typography>
                    </div>


                    <Typography variant="body1" className="letterMessage">
                        {letter.messageBody}
                    </Typography>

                    <div className="gmailActions">
                        <Button variant="contained" color="success" startIcon={<FaCheckCircle />}>
                            Accept
                        </Button>
                        <Button variant="contained" color="error" startIcon={<FaTimesCircle />}>
                            Reject
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SingleLetterView;
