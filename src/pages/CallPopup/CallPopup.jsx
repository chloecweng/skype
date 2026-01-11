import React from "react";
import "../StartPage/StartPage.css"; 
import "./CallPopup.css";

const CallPopupWindow = () => {
  const handleDecline = () => {
    window.close();
  };

  const handleAnswerVideo = () => {
    console.log('Answer video clicked');
    
    if (window.electronAPI && window.electronAPI.answerVideoCall) {
        console.log('Sending answer-video-call');
        window.electronAPI.answerVideoCall({
        contactName: "August27",
        callType: "video",
        });
    } else {
        console.log('electronAPI not available');
    }
    
    // Close the popup after a longer delay
    setTimeout(() => {
        console.log('Closing popup window');
        window.close();
    }); // Increased delay
    };

  return (
    <div className="call-window-wrapper" style={{ background: "transparent" }}>
      <div className="incoming-call-window">
        <div className="call-header">
          <div className="skype-call-logo">
            <img src="/assets/skype.png" alt="Skype" />
          </div>
          <button className="close-x" onClick={handleDecline}>
            ×
          </button>
        </div>

        <div className="call-body">
          <div className="caller-avatar-large"></div>
          <div className="call-info-text">
            <p className="caller-name-title">August 27 is video calling</p>
          </div>
        </div>

        <div className="call-footer-actions">
          <button className="btn-call-action accept-audio">
            <img src="/assets/call.svg" alt="" />
            Answer
          </button>
          <button
            className="btn-call-action accept-video"
            onClick={handleAnswerVideo}
          >
            <img src="/assets/video.svg" alt="" /> Answer with video
          </button>
          <button
            className="btn-call-action decline-call"
            onClick={handleDecline}
          >
            <img src="/assets/call.svg" alt="" />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallPopupWindow;