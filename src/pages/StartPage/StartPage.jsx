import React, { useState, useEffect, useRef } from 'react';
import './StartPage.css';

const StartPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'James',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setChatHistory([]);
      setMessage('');
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="start-page-container">
      <div className="skype-background-layer">
        <div className="chat-field">
          
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
              <img src="/public/assets/clock.svg" className="tool-icon-clock" alt="" />
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
                <textarea 
                  className="chat-input"
                  placeholder="Type a message to Arnas here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="message-button" onClick={handleSendMessage}>
                <img src="/public/assets/icon.svg" className="send-icon" alt="Send" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;