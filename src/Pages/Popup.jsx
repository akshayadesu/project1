import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send the message to the server
        console.log(message);
        onClose(); // Close the popup after submission
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2 className="popup-title">Reject Reason</h2>
                <form className="popup-form" onSubmit={handleSubmit}>
                    <textarea
                        className="popup-textarea"
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Enter the reason for rejection"
                        required
                    ></textarea>
                    <div className="popup-buttons">
                        <button type="submit" className="popup-submit-btn">Send</button>
                        <button type="button" className="popup-cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;
