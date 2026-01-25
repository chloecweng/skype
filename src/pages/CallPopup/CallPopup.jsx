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
            <img src="/assets/skype-wordmark.svg" alt="Skype" />
          </div>
          <button className="close-x" onClick={handleDecline}>
            ×
          </button>
        </div>

        <div className="call-body">
          <div className="caller-avatar-large"></div>
          <div className="call-info-text">
            <p className="caller-name-title">August27 is video calling</p>
          </div>
        </div>

        <div className="call-footer-actions">
            <div className="answer-button">
                <img src="/assets/answer-button.svg" alt="" />
            </div>
            <div className="answer-video-button">
                <img 
                src="/assets/answer-w-video-button.svg" 
                alt="" 
                onClick={handleAnswerVideo}
                style={{ cursor: 'pointer' }}
                />
            </div>
            <div className="decline-button">
                <img 
                src="/assets/decline-button.svg" 
                alt="" 
                onClick={handleDecline}
                style={{ cursor: 'pointer' }}
                />
            </div>
</div>
      </div>
    </div>
  );
};

export default CallPopupWindow;