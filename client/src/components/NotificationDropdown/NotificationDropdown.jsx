import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import "./NotificationDropdown.scss";
import { useGetAllRequestLetterQuery, useListForNotificationQuery, useMarkRequestLetterAsSeenMutation } from "../../features/redux/users/RequestLetter";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentUser } from "../../features/redux/auth/AuthSlice";
import { SocketContext } from "../../features/context/SocketContext";
import { useContext } from "react";

const NotificationDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const role = useSelector(selectCurrentRole)
  const { socketRef } = useContext(SocketContext);
  const user = useSelector(selectCurrentUser);
  const pathPrefix = role === "Student" ? "/student" : "/dashboard";
  const {refetch: refetchRequestLetter } = useGetAllRequestLetterQuery();


  const { data, isLoading, isError, refetch } = useListForNotificationQuery();
  // console.log(data, "notification data");

  const [markAsSeen] = useMarkRequestLetterAsSeenMutation();

  const navigate = useNavigate()

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    const handleNewLetter = (letter) => {

      const isRecipient = letter?.toUids?.some(
        (recipient) => recipient.userId === user
      );

      if (isRecipient) {
        refetch();
      }
    };

    socket.on("newRequestLetter", handleNewLetter);


  }, [socketRef, user])

  const notificationList = data?.unseenLetters || [];

  const [filteredNotifications, setFilteredNotifications] = useState(notificationList);

  useEffect(() => {
    setFilteredNotifications(notificationList);
  }, [data]);

  const removeNotification = async (id) => {
    try {
      await markAsSeen(id).unwrap();
      await refetch()
      await refetchRequestLetter();
    } catch (error) {
      console.error("Error marking as seen:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);


  const navigateToLetter = async (id) => {
    try {
      await markAsSeen(id).unwrap();
      await refetch()
      navigate(`${pathPrefix}/requestLetter/${id}`)
      setFilteredNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Error marking as seen:", error);
    }

  }



  return (
    <div className="notification" ref={dropdownRef}>
      <div className="bell-icon" onClick={() => setShowNotifications((prev) => !prev)}>
        {filteredNotifications.length > 0 && <span>{filteredNotifications.length}</span>}
        <Bell size={24} style={{ cursor: "pointer" }} />
      </div>

      {filteredNotifications.length > 0 && showNotifications && (
        <div className="notification-dropdown">
          {filteredNotifications.map((notif) => (
            <div className="notification-item" key={notif._id} onClick={() => navigateToLetter(notif._id)}>
              <div className="notif-info">
                <strong>{notif?.fromUser?.fullName || "Unknown Sender"}</strong>
                <p>{notif.subject}</p>
              </div>
              <X size={18} className="close-icon" onClick={(e) => {
                e.stopPropagation()
                removeNotification(notif._id)
              }
              } />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;