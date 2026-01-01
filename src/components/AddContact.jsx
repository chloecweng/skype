const AddContact= ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          {/* <span>Add a Contact</span> */}
        </div>
        <div className="popup-body">
          {/* <p>Enter the Skype Name or email of the person you want to add:</p> */}
          {/* <input type="text" className="skype-input" placeholder="skype.user123" /> */}
        </div>
        <div className="popup-footer">
          <button className="add-btn">Add Skype Contact</button>
          <button className="cancel-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddContact;