import React, { useState } from 'react';
import MessageList from './components/MessageList';

function App() {

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);


  const getCounterColor = () => {
    const remaining = 280 - text.length;

    if (remaining < 0) {
      return 'text-red-500 font-bold';
    }
    if (remaining <= 20) {
      return 'text-orange-500 font-medium';
    }
    return 'text-gray-500';
  };

  const handlePost = () => {

    if (text.trim().length === 0 || text.length > 280) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([newMessage, ...messages]);

    setText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white border border-gray-300 rounded rounded-xl p-4">
        {/* Text Area */}
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className="w-full p-2 border border-gray-300 rounded rounded-xl resize-none focus:outline-none focus:border-blue-500"
        />

        {/* Footer: Counter & Button */}
        <div className="flex justify-between items-center mt-2">
          {/* Character counter */}
          <span className={`text-sm ${getCounterColor()}`}>
            {280 - text.length} character left
          </span>

          {/* Button disabled directly based on text */}
          <button
            onClick={handlePost}
            disabled={text.trim().length === 0 || text.length > 280}
            className="px-4 py-1.5 bg-blue-500 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
      {/* Messages List */}
      <MessageList messages={messages} />
    </div>
  );
}

export default App;