import React, { useState, useEffect } from "react";
import "./AddContactPage.css";

const AddContactPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");

  // Resize window based on current step
  useEffect(() => {
    if (window.electronAPI && window.electronAPI.resizeWindow) {
      // Step heights: 1=~350px, 2=~350px, 3=~500px, 4=~450px, 5=~600px
      const stepHeights = {
        1: 400,
        2: 400,
        3: 486,
        4: 422,
        5: 629,
      };
      const height = stepHeights[currentStep] || 600;
      window.electronAPI.resizeWindow(753, height);
    }
  }, [currentStep]);

  // Auto-advance from step 2 to step 3 after 3-5 seconds
  useEffect(() => {
    if (currentStep === 2) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 50) {
            clearInterval(interval);
            return 50;
          }
          return prev + 2;
        });
      }, 100);

      const timeout = setTimeout(() => {
        setCurrentStep(3);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [currentStep]);

  const handleFind = () => {
    if (email.trim()) {
      setCurrentStep(2);
    }
  };

  const handleStopSearch = () => {
    setCurrentStep(1);
    setLoadingProgress(0);
  };

  const handleAddSkypeContact = () => {
    if (currentStep === 3) {
      setSelectedContact({
        name: "James",
        skypeName: "cashflowtubes",
        fullName: "Nick Lannan",
        country: "United States, ohio",
      });
      setCurrentStep(4);
    }
  };

  const handleSend = () => {
    setCurrentStep(5);
  };

  const handleFinish = () => {
    // Send contact data to main window via IPC
    if (window.electronAPI && window.electronAPI.addContact) {
      window.electronAPI.addContact({
        id: `contact-${Date.now()}`,
        name: selectedContact?.name || "James",
        skypeName: selectedContact?.skypeName || "cashflowtubes",
        status: "offline",
        statusMessage: message.trim() || "(happy)",
        country: selectedContact?.country || "United States",
      });
    }
    window.close();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    window.close();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="add-contact-container">
              <div className="contact-email-container">
                <div className="online-icon">
                  <img src="/assets/online.svg" alt="" />
                </div>
                <div className="contact-email">
                  <p className="contact-title">Add a Skype contact</p>
                  <p className="contact-instructions">
                    Find people who use Skype and add them to your contact list.
                    Enter their{" "}
                    <span className="bold-text">Skype Name, full name</span> or{" "}
                    <span className="bold-text">e-mail address</span> and click
                    Find.
                  </p>
                  <div className="email-field">
                    <input
                      type="text"
                      className="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                    />
                    <button className="find-btn" onClick={handleFind}>
                      Find
                    </button>
                  </div>
                  <p className="myspace-note">
                    You can also add MySpaceIM contacts. Enter their MySpaceIM
                    name and click "Find".
                  </p>
                </div>
              </div>
              <p className="or-text">...or</p>
              <div className="add-phone">
                <div className="landline-icon">
                  <img src="/assets/landline.svg" alt="" />
                </div>
                <p className="phone-link">
                  Add an ordinary phone number as a SkypeOut contact
                </p>
              </div>
            </div>
            <div className="footer">
              <button className="add-contact-btn-inactive">
                Add Skype Contact
              </button>
              <button className="close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="add-contact-container">
              <div className="contact-email-container">
                <div className="online-icon">
                  <img src="/assets/online.svg" alt="" />
                </div>
                <div className="contact-email">
                  <p className="contact-title">Add a Skype contact</p>
                  <p className="contact-instructions">
                    Find people who use Skype and add them to your contact list.
                    Enter their{" "}
                    <span className="bold-text">Skype Name, full name</span> or{" "}
                    <span className="bold-text">e-mail address</span> and click
                    Find.
                  </p>
                  <div className="email-field">
                    <input
                      type="text"
                      className="email-input"
                      value={email}
                      readOnly
                    />
                    <button
                      className="stopsearch-btn"
                      onClick={handleStopSearch}
                    >
                      Stop Search
                    </button>
                  </div>
                  <p className="myspace-note">
                    You can also add MySpaceIM contacts. Enter their MySpaceIM
                    name and click "Find".
                  </p>
                </div>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-background"></div>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="footer">
              <button className="add-contact-btn-inactive">
                Add Skype Contact
              </button>
              <button className="close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="add-contact-container">
              <div className="contact-email-container">
                <div className="online-icon">
                  <img src="/assets/online.svg" alt="" />
                </div>
                <div className="contact-email">
                  <p className="contact-title">Add a Skype contact</p>
                  <p className="contact-instructions">
                    Find people who use Skype and add them to your contact list.
                    Enter their{" "}
                    <span className="bold-text">Skype Name, full name</span> or{" "}
                    <span className="bold-text">e-mail address</span> and click
                    Find.
                  </p>
                  <div className="email-field">
                    <input
                      type="text"
                      className="email-input"
                      value={email}
                      readOnly
                    />
                    <button
                      className="stopsearch-btn"
                      onClick={handleStopSearch}
                    >
                      Stop Search
                    </button>
                  </div>
                  <p className="myspace-note">
                    You can also add MySpaceIM contacts. Enter their MySpaceIM
                    name and click "Find".
                  </p>
                </div>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-background"></div>
                <div
                  className="progress-bar-fill"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <table class="results-table">
                
                <thead className="column-labels">
                  <tr>
                    <th className="column-header">Full Name</th>
                    <th className="column-header">Skype Name</th>
                    <th className="column-header">Country / Region</th>
                    <th className="column-header">Profile</th>
                  </tr>
                </thead>
                <tbody className="result-row">
                  <tr>
                    <td>Nick Lannan</td>
                    <td>cashflowtubes</td>
                    <td>
                      <div class="result-location">
                        <img
                          src="http://localhost:3845/assets/576b925393e9f8836fe35e7a0bf63b06be778c70.png"
                          alt=""
                          className="country-flag"
                        />
                        <span>United States, Ohio</span>
                      </div>
                    </td>
                    <td>
                      <button class="info-btn" aria-label="View profile">
                        <img
                          src="http://localhost:3845/assets/e853ffaadec779819f9cad9e7686fffa45be5ec6.png"
                          alt=""
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="footer">
              <button
                className="add-contact-btn-active"
                onClick={handleAddSkypeContact}
              >
                Add Skype Contact
              </button>
              <button className="close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="contact-message-container">
              <p className="intro-text">
                Add <span className="bold-text">James</span> to your Contact
                List and request his/her contact details.
              </p>
              <div className="contact-message-wrapper">
                <div className="contact-header">
                  <div className="online-icon-small">
                    <img src="/assets/online.svg" alt="" />
                  </div>
                  <p className="contact-name-header">James ???</p>
                </div>
                <div className="contact-message">
                  <div className="contact-profile-placeholder">
                    <img
                      src="http://localhost:3845/assets/55cf134af09579ef8d97b246684104b49ba04034.png"
                      alt=""
                    />
                  </div>
                  <textarea
                    className="first-message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=""
                  />
                </div>
                <p className="contact-country">United States</p>
              </div>
            </div>
            <div className="footer-with-back">
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
              <div className="footer-btn-wrapper">
                <button className="send-btn" onClick={handleSend}>
                  Send
                </button>
                <button className="close-btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="completion-wrapper">
              <div className="hurray-banner">
                <div className="hurray-icon">
                  <img
                    src="http://localhost:3845/assets/f3a0799cbdea4e3fac10e046ce98cb12aaad73e9.png"
                    alt=""
                  />
                </div>
                <p className="hurray-text">
                  Hurray! You've added Darragh Delaney to your Contact list
                </p>
              </div>
              <div className="status-example">
                <div className="offline-example">
                  <p className="status-text">
                    This person needs to accept your request. Until then, their
                    status will appear as Offline.
                  </p>
                  <div className="offline-icon">
                    <img
                      src="http://localhost:3845/assets/003d50ea9afe645ee50b637e83d825215cf3db14.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="online-example">
                  <p className="status-text">
                    When they've accepted, you'll see when they come online.
                  </p>
                  <div className="online-icon-small">
                    <img src="/assets/online.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="add-more-container">
                <p className="add-more-text">
                  Close this window to edit your new contact's profile, or add
                  more contacts.
                </p>
                <button className="add-more-btn">Add more contacts</button>
              </div>
              <div className="more-container">
                <div className="more-header">
                  <p className="more-title">More things you can do</p>
                </div>
                <div className="more-links">
                  <p>Save a phone number in your Contact list</p>
                  <p>Add people from your email address books</p>
                  <p>Help a friend get started on Skype</p>
                </div>
              </div>
            </div>
            <div className="footer">
              <button className="close-btn" onClick={handleFinish}>
                Close
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-contact-window">
      <div className="header-wrapper">
        <div className="header">
          <div className="addUserImg">
            <img src="/assets/AddPeople.png" alt="" />
          </div>
          <div className="header-title">
            <p>Add a Contact</p>
          </div>
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default AddContactPage;
