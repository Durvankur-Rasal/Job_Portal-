import React, { useState } from 'react';
import ChatbotMessage from './ChatbotMessage';
import ChatbotInput from './ChatbotInput';

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I assist you with your job search today?' }
  ]);
  const [open, setOpen] = useState(false);

  const sendMessage = async (text) => {
    setMessages([...messages, { from: 'user', text }]);
    try {
      const response = await fetch('http://localhost:8000/api/v1/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (!response.ok) {
        setMessages(msgs => [...msgs, { from: 'bot', text: "Sorry, I couldn't process your request." }]);
        return;
      }
      const data = await response.json();
      setMessages(msgs => [...msgs, { from: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(msgs => [...msgs, { from: 'bot', text: "Sorry, something went wrong." }]);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            fontSize: 28,
            cursor: 'pointer',
            zIndex: 1000
          }}
          aria-label="Open chatbot"
        >
          💬
        </button>
      )}

      {/* Chatbot Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 340,
            height: 480,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div style={{
            background: '#2563eb',
            color: '#fff',
            padding: '16px 20px',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 'bold' }}>Career Assistant</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 22,
                cursor: 'pointer'
              }}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          {/* Messages */}
          <div style={{
            flex: 1,
            padding: 16,
            overflowY: 'auto',
            background: '#f3f4f6'
          }}>
            {messages.map((msg, idx) => (
              <ChatbotMessage key={idx} from={msg.from} text={msg.text} />
            ))}
          </div>
          {/* Input */}
          <div style={{ padding: 12, borderTop: '1px solid #e5e7eb', background: '#fff' }}>
            <ChatbotInput onSend={sendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;