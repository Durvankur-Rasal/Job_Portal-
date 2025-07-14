import React from 'react';

const ChatbotMessage = ({ from, text }) => (
  <div className={`chatbot-message ${from}`}>
    <span>{text}</span>
  </div>
);

export default ChatbotMessage;