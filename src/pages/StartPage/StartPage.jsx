import React from 'react';
import './StartPage.css';

const StartPage = () => {
  return (
    <div className="start-page-container">
      <div className="skype-background-layer">
        <div className="chat-field">
            <div className="message-box">
                <div className="show-messages">
                    <div className="tool-item">
                        <img src="/public/assets/clock.svg" className="tool-icon" alt="" />
                        <span className="tool-text">Show messages from:</span>
                        <span className="blue-text">Yesterday</span>
                        <span className="tool-text">•</span>
                        <span className="blue-text">7 days</span>
                        <span className="tool-text">•</span>
                        <span className="blue-text">30 days</span>
                        <span className="tool-text">•</span>
                        <span className="blue-text">From Beginning</span>
                    </div>
                </div>
                <div className="message-field">
                    <div className="message-tools">
                        <div className="tool-item">
                            <img src="/public/assets/smile.svg" className="tool-icon" alt="" />
                            <img src="/public/assets/polygon2.svg" className="tool-icon-small" alt="" />
                        </div>
                        <div className="tool-item">
                            <img src="/public/assets/file.svg" className="tool-icon" alt="" />
                            <span className="tool-text">Send file</span>
                        </div>
                        <div className="tool-item">
                            <img src="/public/assets/puzzle.svg" className="tool-icon" alt="" />
                            <span className="tool-text">Extras</span>
                        </div>
                    </div>
                    <div className="chat-input-placeholder">
                        Type a message to Arnas here
                    </div>
                </div>
                <div className="message-button">
                    <img src="/public/assets/icon.svg" className="tool-icon" alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;