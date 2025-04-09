import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import "./NotificationDropdown.scss";
import { useListForNotificationQuery, useMarkRequestLetterAsSeenMutation } from "../../features/redux/users/RequestLetter";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../features/redux/auth/AuthSlice";

const NotificationDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const role = useSelector(selectCurrentRole)
  const pathPrefix = role === "Student" ? "/student" : "/dashboard";

  const { data, isLoading, isError, refetch } = useListForNotificationQuery();
  console.log(data, "notification data");
  
  const [markAsSeen] = useMarkRequestLetterAsSeenMutation();

  const navigate = useNavigate()

  useEffect(() => {
    refetch();
  }, []);

  const notificationList = data?.unseenLetters || [];

  const [filteredNotifications, setFilteredNotifications] = useState(notificationList);

  useEffect(() => {
    setFilteredNotifications(notificationList);
  }, [data]);

  const removeNotification = async(id) => {
    try {
      const seen = await markAsSeen(id).unwrap();
      setFilteredNotifications((prev) => prev.filter((notif) => notif._id !== id));      
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


  const navigateToLetter = (id) => {
    navigate(`${pathPrefix}/requestLetter/${id}`)
    setFilteredNotifications((prev) => prev.filter((notif) => notif._id !== id));
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
            <div className="notification-item" key={notif._id} onClick={()=>navigateToLetter(notif._id)}>
              <div className="notif-info">
                <strong>{notif?.fromUser?.fullName || "Unknown Sender"}</strong>
                <p>{notif.subject}</p>
              </div>
              <X size={18} className="close-icon" onClick={(e) =>{
                 e.stopPropagation()
                 removeNotification(notif._id)}
              } />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
