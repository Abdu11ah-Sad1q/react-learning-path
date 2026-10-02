import React from 'react';

function MessageList({ messages }) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-lg mt-4 flex flex-col gap-3">
      {messages.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-300 rounded p-3 shadow-sm"
        >
          {/* Post Content */}
          <p className="text-gray-800 break-words">{item.text}</p>

          {/* Timestamp */}
          <div className="text-right mt-2">
            <span className="text-xs text-gray-400">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;