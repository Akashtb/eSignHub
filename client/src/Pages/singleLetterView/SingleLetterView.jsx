import React, { useEffect } from "react";
import "./SingleLetterView.scss";
import { Button, Card, CardContent, Typography, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useApproveRequestLetterMutation, useGetRequestLetterByIdQuery, useMarkRequestLetterAsSeenMutation, useRejectRequestLetterMutation } from "../../features/redux/users/RequestLetter";
import { selectCurrentRole } from "../../features/redux/auth/AuthSlice";
import { useSelector } from "react-redux";

const SingleLetterView = () => {
    const { id } = useParams();
    const { data, refetch } = useGetRequestLetterByIdQuery(id, {
        skip: !id
    });
    const role = useSelector(selectCurrentRole);

    const [acceptRequestLetter] = useApproveRequestLetterMutation();
    const [rejectRequestLetter] = useRejectRequestLetterMutation();
    const [markAsSeen] = useMarkRequestLetterAsSeenMutation();

    const handleApprove = async () => {
        try {
            await acceptRequestLetter(id).unwrap();
            refetch();
        } catch (error) {
            console.error("Error approving request letter:", error);
        }
    };

    const handleReject = async () => {
        console.log("Approving request letter with ID:", id);
        try {
            await rejectRequestLetter(id).unwrap();
            refetch();
        } catch (error) {
            console.error("Error approving request letter:", error);
        }
    };

    const seenBy = async () => {
        try {
            await markAsSeen(id).unwrap();
            console.log("Marked as seen successfully");
        } catch (error) {
            console.error("Error marking as seen:", error);
        }
    };

    useEffect(() => {
        if (id) refetch();
    }, [id, refetch]);

    useEffect(() => {
        if (role !== "Student" && id) {
            seenBy(); 
        }
    }, [id, role]);

    return (
        <div className="gmailLetterPage">
            <Card className="gmailLetterCard">
                <CardContent>
                    <div className="headerSection">
                        <FaArrowLeft className="backIcon" />
                        <Typography variant="h5" className="letterTitle">
                            <strong>{data?.subject}</strong>
                            <Chip label={data?.status} className={`statusChip ${data?.status.toLowerCase()}`} />
                        </Typography>
                    </div>

                    <div className="senderDetails">
                        <Typography variant="subtitle1">
                            <strong>From:</strong> {data?.fromUid?.fullName}
                        </Typography>
                        <Typography variant="subtitle1" className="recipient">
                            <strong>To:</strong>
                            {data?.toUids?.map((items, index) => (
                                <span key={index}>
                                    <Chip label={items.email} className="emailChip" />
                                    {index < data.toUids.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </Typography>
                        <Typography variant="caption" className="date">
                            {data?.date}
                        </Typography>
                    </div>

                    <Typography variant="body1" className="letterMessage">
                        {data?.messageBody}
                    </Typography>
                    {role !=="Student" && <div className="gmailActions">
                        <Button 
                            variant="contained" 
                            color="success" 
                            startIcon={<FaCheckCircle />} 
                            onClick={handleApprove}  // ✅ Added Click Event
                        >
                            Accept
                        </Button>
                        <Button variant="contained" color="error" startIcon={<FaTimesCircle />} onClick={handleReject}>
                            Reject
                        </Button>
                    </div>}
                    
                </CardContent>
            </Card>
        </div>
    );
};

export default SingleLetterView;
