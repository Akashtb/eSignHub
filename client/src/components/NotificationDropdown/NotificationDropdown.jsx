import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import "./NotificationDropdown.scss";

const NotificationDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, sender: "John Doe", subject: "Project Update", time: "10:30 AM" },
    { id: 2, sender: "Jane Smith", subject: "Meeting Reminder", time: "11:00 AM" },
    { id: 3, sender: "Admin", subject: "System Maintenance", time: "1:00 PM" },
  ]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
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

  return (
    <div className="notification" ref={dropdownRef}>
      <div className="bell-icon" onClick={() => setShowNotifications((prev) => !prev)}>
        {notifications.length > 0 && <span>{notifications.length}</span>}
        <Bell size={24} style={{ cursor: "pointer" }} />
      </div>

      {showNotifications && notifications.length > 0 && (
        <div className="notification-dropdown">
          {notifications.map((notif) => (
            <div className="notification-item" key={notif.id}>
              <div className="notif-info">
                <strong>{notif.sender}</strong>
                <p>{notif.subject}</p>
              </div>
              <X size={18} className="close-icon" onClick={() => removeNotification(notif.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
