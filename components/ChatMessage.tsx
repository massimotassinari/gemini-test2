
import React from 'react';
import { ChatMessage as ChatMessageType, Sender } from '../types';
import { UserIcon, AiIcon } from '../constants';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const preStyle: React.CSSProperties = { // Using CSSProperties for <pre> tag whitespace
    whiteSpace: 'pre-wrap',       // Allow wrapping
    wordWrap: 'break-word',       // Break long words
    fontFamily: 'inherit',        // Inherit font from parent
  };


  return (
    <div className={`flex items-end space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
          <AiIcon />
        </div>
      )}
      <div
        className={`p-3 rounded-xl max-w-lg break-words
          ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow'}`}
      >
        <pre style={preStyle}>{message.text}</pre>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
