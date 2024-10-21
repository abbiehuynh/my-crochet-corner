import React from 'react';
import AIForm from './AIForm';

const AIChatBot = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

  return (
    <div className="modal">
        <div className="modal-content">
            <button onClick={onClose}>Close</button>
            {/* will show the user the AI Chat Box */}
            AIChatBot
            <div className="chatbox"> 
                <AIForm />
            </div>
        </div>
    </div>
  )
}

export default AIChatBot;