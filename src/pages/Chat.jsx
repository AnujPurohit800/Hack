import React, { useState } from 'react';
import { Search, Send, User } from 'lucide-react';

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Mock chat data
  const [chats] = useState([
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        avatar: '/placeholder.svg',
        isOnline: true
      },
      lastMessage: 'Hey, about the lost backpack...',
      timestamp: '2:30 PM',
      unread: 2,
      messages: [
        { id: 1, text: 'Hi, I found your post about the lost backpack', sender: 'them', time: '2:15 PM' },
        { id: 2, text: 'Yes, have you found it?', sender: 'me', time: '2:20 PM' },
        { id: 3, text: 'Hey, about the lost backpack...', sender: 'them', time: '2:30 PM' },
      ]
    },
    {
      id: 2,
      user: {
        name: 'Admin Support',
        avatar: '/placeholder.svg',
        isOnline: true,
        isAdmin: true
      },
      lastMessage: 'Thank you for reporting the issue',
      timestamp: '1:45 PM',
      unread: 0,
      messages: [
        { id: 1, text: 'Hello, how can I help you today?', sender: 'them', time: '1:30 PM' },
        { id: 2, text: 'I need help with my post', sender: 'me', time: '1:40 PM' },
        { id: 3, text: 'Thank you for reporting the issue', sender: 'them', time: '1:45 PM' },
      ]
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    // Add message handling logic here
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 h-[calc(100vh-80px)]">
      <div className="bg-gray-800 rounded-xl h-full flex overflow-hidden">
        {/* Chat List */}
        <div className="w-80 border-r border-gray-700">
          {/* Search */}
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-700 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-gray-700' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full bg-gray-600"
                  />
                  {chat.user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{chat.user.name}</span>
                    <span className="text-xs text-gray-400">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center gap-3">
              <img
                src={selectedChat.user.avatar}
                alt={selectedChat.user.name}
                className="w-10 h-10 rounded-full bg-gray-600"
              />
              <div>
                <h3 className="text-white font-medium">{selectedChat.user.name}</h3>
                <span className="text-sm text-gray-400">
                  {selectedChat.user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <User size={48} className="mx-auto mb-4" />
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;