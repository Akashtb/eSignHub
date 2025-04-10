import React, { useEffect, useState } from "react";
import "./SingleLetterView.scss";
import { Button, Card, CardContent, Typography, Chip, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaQrcode } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { useApproveRequestLetterMutation, useGetRequestLetterByIdQuery, useMarkRequestLetterAsSeenMutation, useRejectRequestLetterMutation } from "../../features/redux/users/RequestLetter";
import { selectCurrentRole, selectCurrentUser } from "../../features/redux/auth/AuthSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const SingleLetterView = () => {
    const { id } = useParams();
    const user = useSelector(selectCurrentUser)
    const { data, refetch } = useGetRequestLetterByIdQuery(id, {
        skip: !id
    });

    const [hasSeen, setHasSeen] = useState(false);

    const role = useSelector(selectCurrentRole);
    const navigate = useNavigate();

    const [acceptRequestLetter] = useApproveRequestLetterMutation();
    const [rejectRequestLetter] = useRejectRequestLetterMutation();
    const [markAsSeen] = useMarkRequestLetterAsSeenMutation();

    const [qrOpen, setQrOpen] = useState(false); 

    const handleApprove = async () => {
        try {
            await acceptRequestLetter(id).unwrap();
            toast.success("Letter approved successfully.");
            refetch();
        } catch (error) {
            console.error("Error approving request letter:", error);
            toast.error("Failed to approve the letter.");
        }
    };

    const handleReject = async () => {
        try {
            await rejectRequestLetter(id).unwrap();
            toast.success("Letter rejected successfully.");
            refetch();
        } catch (error) {
            console.error("Error rejecting request letter:", error);
            toast.error("Failed to reject the letter.");  
        }
    };

    const seenBy = async () => {
        try {
            const seen = await markAsSeen(id).unwrap();
            console.log("make as seen response",seen);
                        
        } catch (error) {
            console.error("Error marking as seen:", error);
        }
    };

    useEffect(() => {
        if (id) refetch();
    }, [id, refetch]);

    useEffect(() => {
        if (role !== "Student" && id && data && data?.seenBy) {
            const alreadySeen = data.seenBy.some(entry => {
                return entry.userId === user; 
            });            
            console.log(alreadySeen);
            
            if (!alreadySeen) {
                seenBy();
            }
        }
    }, [id, role, data]); 
    

    return (
        <div className="gmailLetterPage">
            <Card className="gmailLetterCard">
                <CardContent>
                    <div className="headerSection">
                        <FaArrowLeft className="backIcon" onClick={() => navigate(-1)} style={{cursor:"pointer"}}/>
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

                    {/* Show Approve/Reject buttons only if the request is pending */}
                    {role !== "Student" && data?.status === "pending" && (
                        <div className="gmailActions">
                            <Button variant="contained" color="success" startIcon={<FaCheckCircle />} onClick={handleApprove}>
                                Accept
                            </Button>
                            <Button variant="contained" color="error" startIcon={<FaTimesCircle />} onClick={handleReject}>
                                Reject
                            </Button>
                        </div>
                    )}

                    {/* Show QR Code Button only if the request is approved */}
                    {data?.status === "approved" && data?.uniqueCode && role==="Student" &&(
                        <div className="qrCodeSection">
                            <Button variant="contained" color="primary" startIcon={<FaQrcode />} onClick={() => setQrOpen(true)}>
                                Generate QR Code
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* QR Code Modal */}
            <Dialog open={qrOpen} onClose={() => setQrOpen(false)}>
                <DialogContent>
                    <Typography variant="h6" align="center">Scan QR Code</Typography>
                    <div className="qrCodeContainer" style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                        <QRCodeCanvas value={data?.uniqueCode} size={200} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQrOpen(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SingleLetterView;
