import React, { useState, useEffect, useRef } from "react";
import "./StartPage.css";
import AddContact from "../../components/AddContact";

const StartPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: "Harbor_Line",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setChatHistory([]);
      setMessage("");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="start-page-container">
      <div className="skype-background-layer">
        <div className="skype-sidebar">
          {/* 1. TOP USER BOX */}
          <div className="user-profile-card">
            <div className="status-row">
              <img
                src="/public/assets/online.svg"
                className="status-icon"
                alt=""
              />
              <img src="/public/assets/polygon2.svg" className="polygon-icon" alt="" />
              <span className="user-display-name">User</span>
            </div>
            <div className="profile-content">
                <div className="avatar-placeholder"></div>
                <div className="mood-area-container">
                <div className="mood-area">
                    <div className="mood-bubble">Ill talk most of the time :)</div>
                    <img src="/public/assets/clapper.png" className="clapper-icon" alt="" />
                </div>
                <button className="personalize-btn">
                    <span className="personalize-text">Personalize ▾</span>
                </button>
                </div>
            </div>
          </div>

          {/* 2. MIDDLE LINK */}
          <div className="promo-link-row">
            <img src="/public/assets/landline.svg" className="promo-icon" alt="" />
            <span className="promo-text">
              Make your free call to an ordinary phone
            </span>
          </div>

          {/* 3. BOTTOM CONTACTS BOX */}
          <div className="contacts-container">
            <div className="search-bar-row">
              <button className="add-contact-btn" onClick={togglePopup}>
                <img src="/public/assets/person.png" className="add-user-icon" alt="" />
                <span className="add-btn-text">New</span>
                <img src="/public/assets/polygon2-black.svg" className="dropdown-arrow-svg" style={{width: "10px"}} alt="" />
              </button>
              <input
                type="text"
                className="contact-search"
                placeholder="Search Contacts, Groups, and Conversation Topics"
              />
            </div>

            <div className="tab-headers">
              <div className="tab-active">Contacts</div>
              <div className="tab">Conversations</div>
            </div>

            <div className="contacts-list">
              {/* Contact rows like 'Arnas' go here */}
            </div>
          </div>
        </div>
        {/* CHAT AREA */}
        <div className="chat-header">
            <div className="august-profile-card">
            <div className="status-row">
              <img
                src="/public/assets/busy.svg"
                className="status-icon"
                alt=""
              />
              <span className="user-display-name">August27</span>
              <div className="add-people-button">
                  <img
                      src="/public/assets/add.svg"
                      className="add-icon"
                      alt=""
                  />
                  <span className="add-people-text">Add people</span>
              </div>
            </div>
            <div className="profile-content">
                <div className="august-placeholder"></div>
                <div className="mood-area2">
                    <div className="time-area"></div>
                    <div className="language-area">
                        <img
                            src="/public/assets/language.svg"
                            className="language-icon"
                            alt=""
                        />
                        <div className="arrow-group">
                            <div className="left-arrow">
                                <img src="/public/assets/left.svg" alt="" />
                            </div>
                            <div className="right-arrow">
                                <img src="/public/assets/right.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="gender-area">
                        <img
                            src="/public/assets/gender.svg"
                            className="gender-icon"
                            alt=""
                        />
                    </div>
                    <div className="name-area">
                        <img
                            src="/public/assets/skype.png"
                            className="skype2-icon"
                            alt=""
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
        {/** CHAT COLUMN */}
        <div className="chat-column">
          <div className="skype-tab">
            <img
              src="/public/assets/skype.png"
              className="skype-tab-icon"
              alt=""
            />
            <span className="skype-text">Skype</span>
          </div>
          <div className="chat-field">
            <div className="chat-buttons">
              <div className="left-buttons">
                <button className="skype-call-button">
                  <img
                    src="/public/assets/call.svg"
                    className="call-icon"
                    alt=""
                  />
                  <span>Call</span>
                </button>
                <button className="skype-call-button">
                  <img
                    src="/public/assets/video.svg"
                    className="call-icon"
                    alt=""
                  />
                  <span>Video Call</span>
                </button>
              </div>
              <div className="right-button">
                <div className="info-dropdown-pill">
                  <div className="info-icon-wrapper">
                    <img
                      src="/public/assets/ellipse2.svg"
                      className="info-icon-svg"
                      alt="Info"
                    />
                    <span className="info-char">i</span>
                  </div>
                  <img
                    src="/public/assets/polygon2.svg"
                    className="dropdown-arrow-svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="history-container" ref={scrollRef}>
              {chatHistory.map((msg) => (
                <div key={msg.id} className="chat-bubble-grid">
                  <span className="msg-user">{msg.sender}</span>
                  <span className="msg-text">{msg.text}</span>
                  <span className="msg-time">{msg.time}</span>
                </div>
              ))}
            </div>

            <div className="message-box">
              <div className="show-messages">
                <img
                  src="/public/assets/clock.svg"
                  className="tool-icon-clock"
                  alt=""
                />
                <span className="tool-text">Show messages from:</span>
                <span className="blue-text">Yesterday</span>
                <span className="tool-text">•</span>
                <span className="blue-text">7 days</span>
                <span className="tool-text">•</span>
                <span className="blue-text">30 days</span>
                <span className="tool-text">•</span>
                <span className="blue-text">From Beginning</span>
              </div>

              <div className="input-row-wrapper">
                <div className="message-field">
                  <div className="message-tools">
                    <div className="tool-item">
                      <img
                        src="/public/assets/smile.svg"
                        className="tool-icon"
                        alt=""
                      />
                      <img
                        src="/public/assets/polygon2.svg"
                        className="tool-icon-small"
                        alt=""
                      />
                    </div>
                    <div className="tool-item">
                      <img
                        src="/public/assets/file.svg"
                        className="tool-icon"
                        alt=""
                      />
                      <span className="tool-text">Send file</span>
                    </div>
                    <div className="tool-item">
                      <img
                        src="/public/assets/puzzle.svg"
                        className="tool-icon"
                        alt=""
                      />
                      <span className="tool-text">Extras</span>
                    </div>
                  </div>
                  <textarea
                    className="chat-input"
                    placeholder="Type a message to August27 here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="message-button" onClick={handleSendMessage}>
                  <img
                    src="/public/assets/icon.svg"
                    className="send-icon"
                    alt="Send"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <AddContact onClose={togglePopup} />}
    </div>
  );
};

export default StartPage;
