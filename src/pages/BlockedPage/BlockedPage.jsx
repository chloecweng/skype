import React, { useEffect, useState } from "react";
import "../AddContactPage/AddContactPage.css";
import "./BlockedPage.css";

const BlockedPage = () => {
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: "contact-august",
      fullName: "August27",
      skypeName: "Aug27",
      location: "United States, Ohio",
      flag: "/assets/usflag-icon.png",
      profilePic: "/assets/flower.png",
    },
  ]);
  const [selectedBlockedId, setSelectedBlockedId] = useState(null);

  useEffect(() => {
    if (window.electronAPI && window.electronAPI.resizeWindow) {
      const height = 396;
      window.electronAPI.resizeWindow(753, height);
    }
  }, []);

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
    <div className="add-contact-window">
      <div className="header-wrapper">
        <div className="header">
          <div className="addUserImg">
            <img src="/assets/blocked-user-icon.png" alt="Blocked" />
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
                className={`blocked-user-row ${selectedBlockedId === user.id ? "blocked-row-selected" : ""}`}
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
