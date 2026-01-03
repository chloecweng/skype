import React, { useState } from "react";
import "./AddContactPage.css";

const AddContactPage = () => {

  return (
    <div className="add-contact-window">
      <div className="contact-header">
        <img src="/assets/addpeople.png" alt="" className="add-people-icon" />
        <h1 className="add-text">Add a Contact</h1>
      </div>

      <div className="contact-body">
        <div className="contact-box">
          <p></p>
          <input type="text" className="skype-input" placeholder="" />
        </div>
        <div className="number-box">
          <span className="skype-input" placeholder="Add an ordinary phone number as a SkypeOut contact" />
        </div>
      </div>

      <div className="contact-footer">
        <button onClick={() => window.close()}>Close</button>
      </div>
    </div>
  );
};

export default AddContactPage;