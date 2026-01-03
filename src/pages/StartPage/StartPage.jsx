import React, { useState, useEffect, useRef } from "react";
import "./StartPage.css";

const StartPage = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentSceneKey, setCurrentSceneKey] = useState("NORMAL");
  const scrollRef = useRef(null);

  // Contact management state
  const [contacts, setContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contactChatHistories, setContactChatHistories] = useState({});

  const handleAddContact = () => {
    window.electronAPI.openAddContactWindow();
  };

  // Listen for new contacts from AddContactPage
  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onContactAdded) {
      window.electronAPI.onContactAdded((contactData) => {
        // Initialize chat history for new contact
        setContactChatHistories((prev) => ({
          ...prev,
          [contactData.id]: []
        }));
        // Add contact to list
        setContacts((prev) => [...prev, contactData]);
        // Select the new contact
        setSelectedContactId(contactData.id);
      });
    }

    return () => {
      if (window.electronAPI && window.electronAPI.removeContactAddedListener) {
        window.electronAPI.removeContactAddedListener();
      }
    };
  }, []);

  // Update chat history when contact is selected
  useEffect(() => {
    if (selectedContactId && contactChatHistories[selectedContactId]) {
      setChatHistory(contactChatHistories[selectedContactId]);
    } else if (!selectedContactId) {
      setChatHistory([]);
    }
  }, [selectedContactId, contactChatHistories]);

  const handleContactClick = (contactId) => {
    setSelectedContactId(contactId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return '/assets/online.svg';
      case 'busy':
        return '/assets/busy.svg';
      case 'dnd':
        return '/assets/busy.svg'; // Use busy icon as DND placeholder
      case 'offline':
        return '/assets/busy.svg'; // Use busy icon as offline placeholder
      default:
        return '/assets/busy.svg';
    }
  };

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  // 1. DATA CONFIGURATION
  const SCENES = {
    NORMAL: {
      initialHistory: [],
      incomingScript: []
    },
    SCENE_2: {
      initialHistory: [
        { sender: "August27", text: "Hello. Can u call tonight?", time: "10:14 PM" },
        { sender: "August27", text: "Please. I will payy u..", time: "10:15 PM" },
        { sender: "August27", text: "Are yu there? Hello. Can u ucal tonite?", time: "10:22 PM" },
        { sender: "August27", text: "Can u call tonight.", time: "10:30 PM" }
      ],
      incomingScript: [] // No new messages pop up here
    },
    SCENE_4: {
      initialHistory: [
        { sender: "August27", text: "TEMP", time: "11:00 PM" }
      ],
      incomingScript: [
        { sender: "August27", text: "Where rrr u?", delay: 1000 },
        { sender: "August27", text: "WHys did you aleave!", delay: 4500 },
        { sender: "August27", text: "I'[m still herea wating", delay: 10500 },
        { sender: "August27", text: "come back. I pAid you", delay: 14500 },
        { sender: "August27", text: "I love you", delay: 17500 },
        { sender: "August27", text: "I will kill you for this.", delay: 23000 },
      ]
    }
  };

  // 2. KEYBOARD LISTENER (Director's Remote)
  useEffect(() => {
    const handleDirectorKeys = (e) => {
      // Don't trigger if James is typing
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;

      if (e.key === "1") setCurrentSceneKey("NORMAL");
      if (e.key === "2") setCurrentSceneKey("SCENE_2");
      if (e.key === "4") setCurrentSceneKey("SCENE_4"); // Map '4' key to SCENE_4
    };

    window.addEventListener("keydown", handleDirectorKeys);
    return () => window.removeEventListener("keydown", handleDirectorKeys);
  }, []);

  // 3. SCENE LOGIC (only applies when no contact is selected)
  useEffect(() => {
    if (selectedContactId) return; // Don't apply scenes when a contact is selected
    
    const scene = SCENES[currentSceneKey];
    
    // Immediately set the missed messages (with unique IDs)
    setChatHistory(scene.initialHistory.map(msg => ({
        ...msg,
        id: `initial-${Math.random()}`
    })));

    // Set timers for incoming messages if they exist
    const timeoutIds = (scene.incomingScript || []).map((msg) => {
      return setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            id: `incoming-${Math.random()}`,
            sender: msg.sender,
            text: msg.text,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }]);
      }, msg.delay);
    });

    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [currentSceneKey, selectedContactId]);

  // 4. AUTO-SCROLL
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim() !== "" && selectedContactId) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: "Harbor_Line",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      
      // Update the contact's chat history
      setContactChatHistories((prev) => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
      }));
      
      // Update current chat history
      setChatHistory((prev) => [...prev, newMessage]);
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

  const getPlaceholderText = () => {
    if (selectedContact) {
      return `Type a message to ${selectedContact.name} here`;
    }
    return "Type a message to August27 here";
  };

  return (
    <div className="start-page-container">
      <div className="skype-background-layer">
        <div className="skype-sidebar">
          {/* USER BOX */}
          <div className="user-profile-card">
            <div className="status-row">
              <img src="/assets/online.svg" className="status-icon" alt="" />
              <img src="/assets/polygon2.svg" className="polygon-icon" alt="" />
              <span className="user-display-name">User</span>
            </div>
            <div className="profile-content">
              <div className="avatar-placeholder"></div>
              <div className="mood-area-container">
                <div className="mood-area">
                  <div className="mood-bubble">Ill talk most of the time :)</div>
                  <img src="/assets/clapper.png" className="clapper-icon" alt="" />
                </div>
                <button className="personalize-btn">
                  <span className="personalize-text">Personalize ▾</span>
                </button>
              </div>
            </div>
          </div>

          <div className="promo-link-row">
            <img src="/assets/landline.svg" className="promo-icon" alt="" />
            <span className="promo-text">Make your free call to an ordinary phone</span>
          </div>

          <div className="contacts-container">
            <div className="search-bar-row">
              <button className="add-contact-btn" onClick={handleAddContact}>
                <img src="/assets/person.png" className="add-user-icon" alt="" />
                <span className="add-btn-text">New</span>
                <img src="/assets/polygon2-black.svg" className="dropdown-arrow-svg" style={{width: "10px"}} alt="" />
              </button>
              <input type="text" className="contact-search" placeholder="Search Contacts..." />
            </div>
            <div className="tab-headers">
              <div className="tab-active">Contacts</div>
              <div className="tab">Conversations</div>
            </div>
            <div className="contacts-list">
              <div className="contacts-list-scrollable">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`contact-item ${selectedContactId === contact.id ? 'contact-selected' : ''}`}
                    onClick={() => handleContactClick(contact.id)}
                  >
                    <div className="contact-status-icon">
                      <img src={getStatusIcon(contact.status)} alt="" />
                    </div>
                    <p className="contact-name">{contact.name}</p>
                    <p className="contact-status-message">({contact.statusMessage})</p>
                  </div>
                ))}
              </div>
              <div className="usercount-footer">
                <p>16,175,278 people online</p>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-header">
          <div className="august-profile-card">
            <div className="status-row">
              <img 
                src={selectedContact ? getStatusIcon(selectedContact.status) : "/assets/busy.svg"} 
                className="status-icon" 
                alt="" 
              />
              <span className="user-display-name">{selectedContact ? selectedContact.name : "August27"}</span>
              <div className="add-people-button">
                <img src="/assets/add.svg" className="add-icon" alt="" />
                <span className="add-people-text">Add people</span>
              </div>
            </div>
            <div className="profile-content">
              <div className="august-placeholder"></div>
              <div className="mood-area2">
                <div className="time-area"></div>
                <div className="language-area">
                  <img src="/assets/language.svg" className="language-icon" alt="" />
                  <div className="arrow-group">
                    <div className="left-arrow"><img src="/assets/left.svg" alt="" /></div>
                    <div className="right-arrow"><img src="/assets/right.svg" alt="" /></div>
                  </div>
                </div>
                <div className="gender-area"><img src="/assets/gender.svg" className="gender-icon" alt="" /></div>
                <div className="name-area"><img src="/assets/skype.png" className="skype2-icon" alt="" /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-column">
          <div className="skype-tab">
            <img src="/assets/skype.png" className="skype-tab-icon" alt="" />
            <span className="skype-text">Skype</span>
          </div>
          <div className="chat-field">
            <div className="chat-buttons">
              <div className="left-buttons">
                <button className="skype-call-button">
                  <img src="/assets/call.svg" className="call-icon" alt="" />
                  <span>Call</span>
                </button>
                <button className="skype-call-button">
                  <img src="/assets/video.svg" className="call-icon" alt="" />
                  <span>Video Call</span>
                </button>
              </div>
              <div className="right-button">
                <div className="info-dropdown-pill">
                  <div className="info-icon-wrapper">
                    <img src="/assets/ellipse2.svg" className="info-icon-svg" alt="" />
                    <span className="info-char">i</span>
                  </div>
                  <img src="/assets/polygon2.svg" className="dropdown-arrow-svg" alt="" />
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
                <img src="/assets/clock.svg" className="tool-icon-clock" alt="" />
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
                    <div className="tool-item"><img src="/assets/smile.svg" className="tool-icon" alt="" /></div>
                    <div className="tool-item"><span className="tool-text">Send file</span></div>
                  </div>
                  <textarea
                    className="chat-input"
                    placeholder={getPlaceholderText()}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={!selectedContactId}
                  />
                </div>
                <div className="message-button" onClick={handleSendMessage}>
                  <img src="/assets/icon.svg" className="send-icon" alt="Send" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIRECTOR PANEL */}
      <div className="director-panel">
        <button onClick={() => setCurrentSceneKey("NORMAL")}>1: Reset</button>
        <button onClick={() => setCurrentSceneKey("SCENE_2")}>2: Scene 2</button>
        <button onClick={() => setCurrentSceneKey("SCENE_4")}>4: Scene 4</button>
      </div>
    </div>
  );
};

export default StartPage;
