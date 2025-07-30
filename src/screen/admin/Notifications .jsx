import React from "react";
import "../../assets/css/Notification.css";

const notifications = [
  {
    name: "Sophia",
    message: "Project assigned by the manager all",
    highlights: ["files", "folders"],
    time: "12 mins ago",
    date: "24,Oct 2023",
    avatarClass: "purple",
  },
  {
    name: "William",
    message: "Admin and other team accepted your work request",
    time: "17 mins ago",
    date: "30,Sep 2023",
    avatarClass: "pink",
  },
  {
    name: "Steven",
    message: "Temporary data will be",
    highlights: ["deleted"],
    message2: "once dedicated time complated",
    time: "4 hrs ago",
    date: "11,Sep 2023",
    avatarClass: "gray",
  },
  {
    name: "Scarlett",
    message: "Approved date for sanction of loan is verified",
    icon: "✅",
    time: "5 hrs ago",
    date: "18,Sep 2023",
    avatarClass: "red",
  },
  {
    name: "Victoria",
    message: "Social network accounts are at risk check your",
    highlights: ["login"],
    message2: "details",
    time: "9 hrs ago",
    date: "15,Sep 2023",
    avatarClass: "violet",
  },
  {
    name: "Amelia",
    message: "Changed the password of gmail 4 hrs ago.",
    highlights: ["Update"],
    time: "12 hrs ago",
    date: "12,Sep 2023",
    avatarClass: "yellow",
  },
  {
    name: "David",
    message: "Tried calling you 5 times but was not reachable.",
    time: "25 mins ago",
    date: "12,Sep 2023",
    avatarClass: "green",
  },
];

const NotificationCard = ({
  name,
  message,
  highlights = [],
  message2 = "",
  icon,
  time,
  date,
  avatarClass,
}) => (
  <div className="notification">
    <div className="notification-left">
      <div className={`avatar ${avatarClass}`}>{name.charAt(0)}</div>
      <div className="notification-content">
        <div className="name">{name}</div>
        <div className="message">
          {message}{" "}
          {highlights.map((text, i) => (
            <span key={i} className={`tag ${text}`}>
              {text}
            </span>
          ))}{" "}
          {message2} {icon && <span>{icon}</span>}
        </div>
        <div className="time">{time}</div>
      </div>
    </div>
    <div className="date">{date}</div>
  </div>
);

const Notification = () => (
  <div className="notification-panel">
    {notifications.map((n, i) => (
      <NotificationCard key={i} {...n} />
    ))}
  </div>
);

export default Notification; 