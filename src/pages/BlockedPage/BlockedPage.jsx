import React, { useEffect, useRef, useState } from "react";
import "../AddContactPage/AddContactPage.css";
import "./BlockedPage.css";

const WINDOW_WIDTH = 753;
const MIN_HEIGHT = 320;
const HEIGHT_PADDING = 16;

const BlockedPage = () => {
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: "contact-august",
      fullName: "August27",
      skypeName: "Aug27",
      location: "United States, Ohio",
      flag: "./assets/usflag-icon.png",
      profilePic: "./assets/flower.png",
    },
  ]);
  const [selectedBlockedId, setSelectedBlockedId] = useState(null);
  const contentRef = useRef(null);

  // Allow document to size to content for measurement
  useEffect(() => {
    document.documentElement.classList.add("content-size-window");
    document.body.classList.add("content-size-window");
    const root = document.getElementById("root");
    if (root) root.classList.add("content-size-window");
    return () => {
      document.documentElement.classList.remove("content-size-window");
      document.body.classList.remove("content-size-window");
      if (root) root.classList.remove("content-size-window");
    };
  }, []);

  // Resize window to fit content (updates when blocked list changes)
  useEffect(() => {
    if (!window.electronAPI?.resizeWindow) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = contentRef.current;
        const contentHeight = el ? el.scrollHeight : document.body.scrollHeight;
        const height = Math.max(MIN_HEIGHT, contentHeight + HEIGHT_PADDING);
        window.electronAPI.resizeWindow(WINDOW_WIDTH, height);
      });
    });
    return () => cancelAnimationFrame(id);
  }, [blockedUsers]);

  const handleUnblock = () => {
    if (!selectedBlockedId) return;
    if (window.electronAPI?.unblockContact) {
      window.electronAPI.unblockContact(selectedBlockedId);
    }
    setBlockedUsers((prev) => prev.filter((u) => u.id !== selectedBlockedId));
    setSelectedBlockedId(null);
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="add-contact-window" ref={contentRef}>
      <div className="header-wrapper">
        <div className="header">
          <div className="addUserImg">
            <img src="./assets/blocked-user-icon.png" alt="Blocked" />
          </div>
          <div className="header-title">
            <p>Your Blocked Users</p>
          </div>
        </div>
      </div>

      <div className="add-contact-container">
        <div className="contact-email-container-2">
          <div className="contact-email">
            <p className="contact-instructions">
              This list shows{" "}
              <span className="bold-text">
                contacts you have blocked on Skype
              </span>
              . Blocked users cannot send you messages, call you, or see your
              online status.
            </p>
          </div>
        </div>

        <table className="results-table" style={{ marginTop: "10px" }}>
          <thead className="column-labels">
            <tr>
              <th className="column-header">Full Name</th>
              <th className="column-header">Skype Name</th>
              <th className="column-header">Country / Region</th>
              <th className="column-header">Profile</th>
            </tr>
          </thead>
          <tbody className="result-row">
            {blockedUsers.map((user) => (
              <tr
                key={user.id}
                className={`blocked-user-row ${selectedBlockedId === user.id ? "result-row-selected" : ""}`}
                onClick={() => setSelectedBlockedId(user.id)}
              >
                <td>{user.fullName}</td>
                <td>{user.skypeName}</td>
                <td>
                  <div className="result-location">
                    <img src={user.flag} className="country-flag" alt="US" />
                    <span>{user.location}</span>
                  </div>
                </td>
                <td>
                  <button className="info-btn">
                    <img src={user.profilePic} alt="info" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <div
          className="footer-right-align"
          style={{ display: "flex", gap: "10px", marginLeft: "auto" }}
        >
          <button
            className={
              selectedBlockedId
                ? "add-contact-btn-active"
                : "add-contact-btn-inactive"
            }
            onClick={handleUnblock}
            disabled={!selectedBlockedId}
          >
            Unblock
          </button>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedPage;
